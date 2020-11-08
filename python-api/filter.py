import json

import gensim
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import numpy as np


class NLPFilter:
    def __init__(self, load_model=True):
        if load_model:
            self.model = gensim.models.KeyedVectors.load_word2vec_format('GoogleNews-vectors-negative300.bin',
                                                                         binary=True)
        self.possible_categories = ['world', 'politics government diplomacy ministry election state country',
                                    'business work', 'fitness health lifestyle wellness',
                                    'technology science robotics computers automation', 'sports play game',
                                    'entertainment amusement relaxation', 'innovation future',
                                    'reel inspiration motivation', 'style fashion vogue trend mode',
                                    'weather climate meteorology temperature', 'travel trip visit tour holiday']
        self.categories_names = ['World', 'Politics', 'Business', 'Health', 'Technology', 'Sports', 'Entertainment',
                                 'Innovation', 'Reel', 'Style', 'Weather', 'Travel']

    def get_categories(self, to_predict):
        return [self.get_category(name) for name in to_predict]

    def get_category(self, title):
        tokens = word_tokenize(title)
        tokens = [w.lower() for w in tokens]
        import string
        table = str.maketrans('', '', string.punctuation)
        stripped = [w.translate(table) for w in tokens]
        words = [word for word in stripped if word.isalpha()]
        stop_words = set(stopwords.words('english'))
        words = [w for w in words if not w in stop_words]
        scores = np.zeros((len(words), len(self.possible_categories)))
        counter = -1
        for element in words:
            counter += 1
            try:
                for index in range(len(self.possible_categories)):
                    scores[counter][index] = max(
                        [self.model.similarity(possible_category, element) for possible_category in
                         self.possible_categories[index].split(' ')])
            except:
                pass
        try:
            shit_formula = np.divide(scores.sum(axis=0), len(words)) + scores.max(axis=0)
        except:
            shit_formula = [0, 0]
        if max(shit_formula) >= 0.4:
            to_return = self.categories_names[np.where(shit_formula == max(shit_formula))[0][0]]
        else:
            to_return = "World"
        return to_return

    @staticmethod
    def filter_articles_by_preferences(preferences):
        """Reads the articles from the articles.json file, filters them according to the preferences
            and saves the result to filtered-articles.json
            Args:
                preferences: Dictionary of preferences
            Returns:
                Nothing
        """
        fav_categories = preferences["categories"]
        fav_websites = preferences["websites"]

        with open('articles.json') as json_file:
            data = json.load(json_file)
            filtered_articles = [article for article in data['articles'] if
                                 article['category'] in fav_categories and article['website'] in fav_websites]

        filtered_articles = {"articles": filtered_articles}
        with open('filtered-articles.json', 'w') as outfile:
            json.dump(filtered_articles, outfile)

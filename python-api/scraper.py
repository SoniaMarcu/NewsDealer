import json
import re
import threading
import time
from enum import Enum

from filter import NLPFilter
from selenium import webdriver
from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.wait import WebDriverWait


class Websites(Enum):
    CNN = ("https://edition.cnn.com/", ["//article/div/div/h3/a[contains(@href, 'index.html')]",
                                       "//article/div/div/h3/a[contains(@href, '/videos/')]"])
    BBC = ("https://www.bbc.com/", ["//a[@class='media__link']"])
    THE_ATLANTIC = ("https://www.theatlantic.com/world/", ["//h2[not(contains(@class, 'section'))]/a"])
    THE_VERGE = ("https://www.theverge.com/", ["//h2/a[contains(@data-analytics-link, 'article')]"])


class Scraper:
    scraping_done = False

    def __init__(self):
        self.nlp_filter = NLPFilter()
        options = webdriver.ChromeOptions()
        options.add_argument("--headless --start-maximized")
        options.add_argument('--ignore-certificate-errors')
        options.add_argument('--ignore-ssl-errors')
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        self.driver = webdriver.Chrome("drivers/chromedriver.exe", options=options)
        self.driver.implicitly_wait(2)

    def __del__(self):
        self.driver.close()

    def get_description_from_article(self, articles):
        descriptions = []
        for article in articles:
            self.driver.get(article)
            consent_button_candidates = self.driver.find_elements_by_xpath("//button")
            for consent_button_candidate in consent_button_candidates:
                expected_button_texts = ["Yes, I agree", "I Accept", "Accept All"]
                for expected_button_text in expected_button_texts:
                    try:
                        actual_button_text = consent_button_candidate.text
                        assert actual_button_text == expected_button_text
                        consent_button_candidate.click()
                        break
                    except AssertionError:
                        pass
                    except StaleElementReferenceException:
                        pass

            WebDriverWait(self.driver, 20).until(ec.visibility_of_any_elements_located((By.TAG_NAME, "body")))
            len_desc = len(descriptions)
            elements = str(self.driver.find_element_by_tag_name("body").text).split('\n')
            for elem in elements:
                if len(elem) > 120:
                    descriptions.append(elem)
                    break
            if len_desc == len(descriptions):
                descriptions.append("")
            if len(descriptions) == 1:
                print(descriptions[0])

        return descriptions

    def get_articles_on(self, website):
        website_name = website.value[0]
        xpaths = website.value[1]

        self.driver.get(website_name)
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        elements = []
        for xpath in xpaths:
            try:
                WebDriverWait(self.driver, 20).until(ec.visibility_of_any_elements_located((By.XPATH, xpath)))
            except StaleElementReferenceException:
                ignored_exceptions = StaleElementReferenceException
                WebDriverWait(self.driver, 20, ignored_exceptions=ignored_exceptions).until(
                    ec.visibility_of_any_elements_located((By.XPATH, xpath)))
            elements += self.driver.find_elements_by_xpath(xpath)

        names = [element.text for element in elements]
        urls = [element.get_attribute("href") for element in elements]
        website = re.search('https://(www\\.)?([^/]*)/?', website_name).group(2)

        print("Number of articles on " + website + ": ", len(names))
        descriptions = self.get_description_from_article(urls)
        categories = self.nlp_filter.get_categories(names)
        articles = [{"id": art_id, "name": name, "category": category, "description": description, "website": website,
                     "url": url} for
                    name, url, art_id, description, category in
                    zip(names, urls, range(1, len(names) + 1), descriptions, categories)]
        return articles

    def extract_articles(self):
        articles = []
        for website in Websites:
            articles += self.get_articles_on(website)

        articles = {"articles": articles}
        with open('articles.json', 'w') as file:
            json.dump(articles, file, ensure_ascii=False)
        Scraper.scraping_done = True

    @staticmethod
    def run():
        while True:
            t1 = threading.Thread(target=Scraper().extract_articles)
            t1.start()
            time.sleep(3000000)

    @staticmethod
    def get_articles():
        if Scraper.scraping_done:
            return open("articles.json")
        else:
            return open("default-articles.json")

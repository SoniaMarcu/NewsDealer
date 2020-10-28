from scraper import Scraper
from filter import NLPFilter

from flask import Flask, Response
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/getFilteredArticles", methods=["GET"])
def get_articles():
    nlp_filter = NLPFilter()
    nlp_filter.filter_articles_by_preferences()

    return Response(open("filtered-articles.json"), 200)


@app.route("/getUnfilteredArticles", methods=["GET"])
def get_unfiltered_articles():
    scraper = Scraper()
    return Response(scraper.get_articles(), 200)

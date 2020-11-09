from scraper import Scraper
from filter import NLPFilter
from flask import request
from flask import Flask, Response
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/getFilteredArticles", methods=["POST"])
def get_articles():
    # TO DO -- get params

    #TO DO filter by preferences

    return Response(open("filtered-articles.json"), 200)


@app.route("/getUnfilteredArticles", methods=["GET"])
def get_unfiltered_articles():
    scraper = Scraper()
    return Response(scraper.get_articles(), 200)








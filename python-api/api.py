import json

from scraper import Scraper
from filter import NLPFilter

from flask import Flask, Response, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/getFilteredArticles", methods=["POST"])
def get_articles():
    preferences = request.get_json()

    nlp_filter = NLPFilter(load_model=False)
    nlp_filter.filter_articles_by_preferences(preferences)

    return Response(open("filtered-articles.json"), 200)

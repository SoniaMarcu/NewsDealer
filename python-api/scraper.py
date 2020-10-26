import json
import re
from enum import Enum
import threading
import time
from selenium import webdriver
from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.wait import WebDriverWait


class Websites(Enum):
    CNN = ("https://edition.cnn.com/", ["//article/div/div/h3/a[contains(@href, 'index.html')]",
                                        "//article/div/div/h3/a[contains(@href, '/videos/')]"])
    BBC = ("https://www.bbc.com/", ["//a[@class='media__link']"])
    THEVERGE=("https://www.theverge.com/", ["//h2/a[contains(@data-analytics-link, 'article')]"])
    THE_DAILY_BEAST=("https://www.thedailybeast.com/", ["//h2/a[starts-with(@class, 'TrackingLink')]"])
    THE_ATLANTIC=("https://www.theatlantic.com/world/", ["//h2[not(contains(@class, 'section'))]/a"])
    # NBC = "https://www.nbcnews.com/"


class Scraper:
    scraping_done=False

    def __init__(self):
        options = Options()
        options.add_argument("--headless --start-maximized")
        # options.add_argument("--start-maximized")
        self.driver = webdriver.Chrome("drivers/chromedriver.exe", options=options)
        self.driver.implicitly_wait(2)

    def __del__(self):
        self.driver.close()

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

        articles = [{"id": art_id, "name": name, "description": "", "website": website, "url": url} for
                    name, url, art_id in zip(names, urls, range(1, len(names) + 1))]
        return articles

    def extract_articles(self):
        articles = []
        for website in Websites:
            articles += self.get_articles_on(website)

        articles = {"articles": articles}
        with open('articles.json', 'w') as file:
            json.dump(articles, file, ensure_ascii=False)
        Scraper.scraping_done=True

    @staticmethod
    def run():
        while True:
            t1 = threading.Thread(target=Scraper().extract_articles)
            t1.start()
            time.sleep(3000000)

    def get_articles(self):
        if(Scraper.scraping_done):
            return open("articles.json")
        else:
            return open("default-articles.json")

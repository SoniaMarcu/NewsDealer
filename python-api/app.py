from api import app
from scraper import Scraper
import threading

if __name__ == '__main__':
    threading.Thread(target=app.run).start()
    #### this works, guys, I just commented it out  cuz my computer can't handle it well :)))
    #Scraper.run()


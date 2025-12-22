import threading
from queue import Queue
from spider import Spider
from domain import get_domain_name
from general import file_to_set
from scrape import scrape_pages
import json


PROJECT_NAME = "crawldata"
HOMEPAGE = "https://thenewboston.com/"
DOMAIN_NAME = get_domain_name(HOMEPAGE)
QUEUE_FILE = PROJECT_NAME + "/queue.txt"
CRAWLED_FILE = PROJECT_NAME + "/crawled.txt"
SCRAPED_FILE = PROJECT_NAME + "/scraped.json"
NUMBER_OF_THREADS = 8
queue = Queue()
Spider(PROJECT_NAME, HOMEPAGE, DOMAIN_NAME)


def create_workers():
    for _ in range(NUMBER_OF_THREADS):
        t = threading.Thread(target=work)
        t.daemon = True
        t.start()


def work():
    while True:
        url = queue.get()
        Spider.crawl_page(threading.current_thread().name, url)
        queue.task_done()


def create_jobs():
    for link in list(file_to_set(QUEUE_FILE))[:10]:
        queue.put(link)
    queue.join()


def crawl():
    queued_links = file_to_set(QUEUE_FILE)
    if len(queued_links) > 0:
        print(str(len(queued_links)) + " links in the queue")
        create_jobs()


create_workers()
crawl()

crawled_links = list(file_to_set(CRAWLED_FILE))[:10]

print("\nScraping crawled pages...\n")

scraped_data = scrape_pages(crawled_links)

for item in scraped_data:
    print(item)


with open(SCRAPED_FILE, "w", encoding="utf-8") as f:
    json.dump(scraped_data, f, ensure_ascii=False, indent=2)

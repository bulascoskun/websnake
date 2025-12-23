import threading
from queue import Queue
from .spider import Spider
from .domain import get_domain_name
from .general import file_to_set
from .scrape import scrape_pages
import json
# import uuid


def run_crawler(homepage: str, max_links: int = 10, threads: int = 8):
    domain_name = get_domain_name(homepage)
    # project_name = f"crawldata/{str(uuid.uuid4())}"
    project_name = f"crawldata/{domain_name}"

    QUEUE_FILE = f"{project_name}/queue.txt"
    CRAWLED_FILE = f"{project_name}/crawled.txt"
    SCRAPED_FILE = f"{project_name}/scraped.json"

    queue = Queue()
    Spider(project_name, homepage, domain_name)

    def work():
        while True:
            url = queue.get()
            if url is None:
                queue.task_done()
                break
            Spider.crawl_page(threading.current_thread().name, url)
            queue.task_done()

    # start workers
    workers = []
    for _ in range(threads):
        t = threading.Thread(target=work)
        t.start()
        workers.append(t)

    # add jobs
    for link in list(file_to_set(QUEUE_FILE))[:max_links]:
        queue.put(link)

    queue.join()

    # stop workers
    for _ in workers:
        queue.put(None)

    for t in workers:
        t.join()

    # scrape
    crawled_links = list(file_to_set(CRAWLED_FILE))[:max_links]
    scraped_data = scrape_pages(crawled_links)

    with open(SCRAPED_FILE, "w", encoding="utf-8") as f:
        json.dump(scraped_data, f, ensure_ascii=False, indent=2)

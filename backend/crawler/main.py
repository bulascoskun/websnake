import threading
from queue import Queue
from crawler.spider import Spider
from crawler.domain import get_domain_name
from crawler.general import file_to_set
from crawler.scrape import scrape_pages
import json
import uuid
from app.core.database import SessionLocal
import os
from app.service.crawlService import CrawlService


def run_crawler(
    homepage: str,
    job_id: int,
):
    db = SessionLocal()

    domain_name = get_domain_name(homepage)
    project_name = f"crawldata/{domain_name}-{str(uuid.uuid4())}"

    THREADS = 8
    MAX_LINKS = 10
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
    for _ in range(THREADS):
        t = threading.Thread(target=work)
        t.start()
        workers.append(t)

    # add jobs
    for link in list(file_to_set(QUEUE_FILE))[:MAX_LINKS]:
        queue.put(link)

    queue.join()

    # stop workers
    for _ in workers:
        queue.put(None)

    for t in workers:
        t.join()

    try:
        # scrape
        crawled_links = list(file_to_set(CRAWLED_FILE))[:MAX_LINKS]
        scraped_data = scrape_pages(crawled_links)

        # write to json
        with open(SCRAPED_FILE, "w", encoding="utf-8") as f:
            json.dump(scraped_data, f, ensure_ascii=False, indent=2)

        # save to db
        CrawlService(session=db).save_scraped_pages(job_id, scraped_data)

        # remove files
        if os.path.exists(QUEUE_FILE):
            os.remove(QUEUE_FILE)

        if os.path.exists(CRAWLED_FILE):
            os.remove(CRAWLED_FILE)

        if os.path.exists(SCRAPED_FILE):
            os.remove(SCRAPED_FILE)

        CrawlService(session=db).complete_job(job_id)

    except Exception as e:
        CrawlService(session=db).fail_job(job_id)
        print("Crawler error:", e)

    finally:
        db.close()

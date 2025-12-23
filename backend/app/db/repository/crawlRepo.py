# app/db/crud/crawler.py
from sqlalchemy.orm import Session
from app.db.models.crawl_job import CrawlJob
from app.db.models.scraped_page import ScrapedPage
from datetime import datetime, UTC


def create_job(db: Session, url: str) -> CrawlJob:
    job = CrawlJob(url=url, status="processing")
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


def complete_job(db: Session, job_id: int):
    job = db.get(CrawlJob, job_id)
    if job:
        job.status = "completed"
        job.finished_at = datetime.now(UTC)
        db.commit()


def fail_job(db: Session, job_id: int):
    job = db.get(CrawlJob, job_id)
    if job:
        job.status = "failed"
        db.commit()


def save_scraped_pages(db: Session, job_id: int, pages: list[dict]):
    print("Saving to db...")
    for page in pages:
        db.add(
            ScrapedPage(
                job_id=job_id,
                url=page.get("url"),
                title=page.get("title"),
                description=page.get("description"),
                body_preview=page.get("body_preview"),
                h1=page.get("h1"),
            )
        )
    db.commit()
    print("Saving complete")

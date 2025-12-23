from .base import BaseRepository
from app.db.models.crawl_job import CrawlJob
from app.db.models.scraped_page import ScrapedPage
from datetime import datetime, UTC


class CrawlRepository(BaseRepository):
    def create_job(self, url: str) -> CrawlJob:
        job = CrawlJob(url=url, status="processing")
        self.session.add(job)
        self.session.commit()
        self.session.refresh(job)
        return job

    def complete_job(self, job_id: int):
        job = self.session.get(CrawlJob, job_id)
        if job:
            job.status = "completed"
            job.finished_at = datetime.now(UTC)
            self.session.commit()

    def fail_job(self, job_id: int):
        job = self.session.get(CrawlJob, job_id)
        if job:
            job.status = "failed"
            self.session.commit()

    def save_scraped_pages(self, job_id: int, pages: list[dict]):
        print("Saving to db...")
        for page in pages:
            self.session.add(
                ScrapedPage(
                    job_id=job_id,
                    url=page.get("url"),
                    title=page.get("title"),
                    description=page.get("description"),
                    body_preview=page.get("body_preview"),
                    h1=page.get("h1"),
                )
            )
        self.session.commit()
        print("Saving complete")

    def get_scraped_pages(self):
        pages = self.session.query(ScrapedPage).limit(200).all()

        return [
            {
                "id": p.id,
                "job_id": p.job_id,
                "url": p.url,
                "title": p.title,
                "description": p.description,
                "body_preview": p.body_preview,
                "h1": p.h1,
            }
            for p in pages
        ]

from sqlalchemy import func
from .base import BaseRepository
from app.db.models.crawl_job import CrawlJob
from app.db.models.scraped_page import ScrapedPage
from datetime import datetime, UTC
from app.db.models.users_jobs import UsersJobs
from typing import Optional


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

    def get_job_by_domain_name(self, domain_name: str):
        return self.session.query(CrawlJob).filter(CrawlJob.url == domain_name).first()

    def get_job_by_id(self, id: int) -> CrawlJob:
        return self.session.query(CrawlJob).filter(CrawlJob.id == id).first()

    def create_user_job_relation(self, user_id: int, job_id: int):
        new_user_job = UsersJobs(user_id=user_id, job_id=job_id)

        self.session.add(instance=new_user_job)
        self.session.commit()
        self.session.refresh(instance=new_user_job)
        return new_user_job

    def check_user_jobs(self, user_id: int, job_id: Optional[int] = None):
        query = self.session.query(UsersJobs).filter(UsersJobs.user_id == user_id)

        if job_id is not None:
            query = query.filter(UsersJobs.job_id == job_id)
            return query.first()
        else:
            return query.all()

    def get_pages_paginated(
        self,
        job_id,
        limit: int,
        offset: int,
    ):
        query = self.session.query(ScrapedPage).filter(ScrapedPage.job_id == job_id)

        total = query.with_entities(func.count()).scalar()

        items = query.order_by(ScrapedPage.id.desc()).limit(limit).offset(offset).all()

        return items, total

    def get_page_count_by_job_id(
        self,
        job_id,
    ):
        query = self.session.query(ScrapedPage).filter(ScrapedPage.job_id == job_id)
        total = query.with_entities(func.count()).scalar()
        return total

    def get_crawl_jobs_paginated(
        self,
        job_ids: list[int],
        limit: int,
        offset: int,
    ):
        query = self.session.query(CrawlJob).filter(CrawlJob.id.in_(job_ids))

        total = query.with_entities(func.count()).scalar()

        items = (
            query.order_by(CrawlJob.created_at.desc()).limit(limit).offset(offset).all()
        )

        return items, total

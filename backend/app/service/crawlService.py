from app.db.repository.crawlRepo import CrawlRepository
from sqlalchemy.orm import Session
from fastapi import HTTPException
from crawler.main import run_crawler
from crawler.domain import get_domain_name


class CrawlService:
    def __init__(self, session: Session):
        self.__crawlRepository = CrawlRepository(session=session)

    def start_crawler(self, url, background_tasks, user):
        domain_name = get_domain_name(url)

        # 1. Check if job exists
        job_exists = self.__crawlRepository.get_job_by_domain_name(domain_name)

        if not job_exists:
            # Create job
            job = self.__crawlRepository.create_job(url=domain_name)

            background_tasks.add_task(
                run_crawler,
                homepage=url,
                job_id=job.id,
            )

            # Add relation
            self.__crawlRepository.create_user_job_relation(user.id, job.id)

            return {"message": "Success - 1"}

        # 2. Check if user has job
        user_has_job = self.__crawlRepository.check_user_jobs(
            user_id=user.id, job_id=job_exists.id
        )

        if user_has_job:
            raise HTTPException(status_code=400, detail="You have already crawled")

        # 3. Only add relation if job_exists && !user_has_job
        if not user_has_job:
            self.__crawlRepository.create_user_job_relation(user.id, job_exists.id)
            return {"message": "Success - 2"}

    def get_list(self, job_id, user_id, page, per_page):
        # does job_id and user_id match
        users_job = self.__crawlRepository.check_user_jobs(
            user_id=user_id, job_id=job_id
        )
        if not users_job:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication",
            )

        # job details
        job = self.__crawlRepository.get_job_by_id(id=job_id)

        # list
        offset = (page - 1) * per_page

        items, total = self.__crawlRepository.get_pages_paginated(
            job_id=job_id,
            limit=per_page,
            offset=offset,
        )

        return {
            "domain_data": job,
            "data": items,
            "page": page,
            "per_page": per_page,
            "total": total,
            "total_pages": (total + per_page - 1) // per_page,
        }

    def get_domains(self, user_id: int, page: int, per_page: int):
        users_jobs = self.__crawlRepository.check_user_jobs(user_id=user_id)

        if not users_jobs:
            raise HTTPException(status_code=400, detail="Pages not found")

        job_ids = [uj.job_id for uj in users_jobs]

        offset = (page - 1) * per_page

        items, total = self.__crawlRepository.get_crawl_jobs_paginated(
            job_ids=job_ids,
            limit=per_page,
            offset=offset,
        )

        return {
            "data": items,
            "page": page,
            "per_page": per_page,
            "total": total,
            "total_pages": (total + per_page - 1) // per_page,
        }

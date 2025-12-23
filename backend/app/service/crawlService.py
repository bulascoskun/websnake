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
            job = self.__crawlRepository.create_job(url=domain_name)

            # Add relation
            self.__crawlRepository.create_user_job_relation(user.id, job.id)

            return {"message": "Success - 1"}

        # 2. Check if user has job
        user_has_job = self.__crawlRepository.check_user_has_job(user.id, job_exists.id)

        if user_has_job:
            raise HTTPException(status_code=400, detail="You have already crawled")

        # 3. Only add relation if job_exists && !user_has_job
        if not user_has_job:
            self.__crawlRepository.create_user_job_relation(user.id, job_exists.id)
            return {"message": "Success - 2"}

    def get_scraped_pages(self):
        pages = self.__crawlRepository.get_scraped_pages()
        if not pages:
            raise HTTPException(status_code=400, detail="Pages not found")
        return pages

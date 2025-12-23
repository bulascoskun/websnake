from app.db.repository.crawlRepo import CrawlRepository
from sqlalchemy.orm import Session
from fastapi import HTTPException


class CrawlService:
    def __init__(self, session: Session):
        self.__crawlRepository = CrawlRepository(session=session)

    # job related --start
    def create_job(self, url):
        return self.__crawlRepository.create_job(url)

    def complete_job(self, job_id):
        return self.__crawlRepository.complete_job(job_id)

    def fail_job(self, job_id):
        return self.__crawlRepository.fail_job(job_id)

    def save_scraped_pages(self, job_id, pages):
        return self.__crawlRepository.save_scraped_pages(job_id, pages)

    # job related --end

    def get_scraped_pages(self):
        pages = self.__crawlRepository.get_scraped_pages()
        if not pages:
            raise HTTPException(status_code=400, detail="Pages not found")
        return pages

    def get_job_by_domain_name(self, domain_name: str):
        return self.__crawlRepository.get_job_by_domain_name(domain_name)

    def check_user_has_job(self, user_id: int, job_id: int):
        return self.__crawlRepository.check_user_has_job(user_id, job_id)

    def add_user_job_relation(self, user_id: int, job_id: int):
        return self.__crawlRepository.create_user_job_relation(user_id, job_id)

from app.db.repository.crawlRepo import CrawlRepository
from sqlalchemy.orm import Session
from fastapi import HTTPException


class CrawlService:
    def __init__(self, session: Session):
        self.__crawlRepository = CrawlRepository(session=session)

    def create_job(self, url):
        return self.__crawlRepository.create_job(url)

    def complete_job(self, job_id):
        return self.__crawlRepository.complete_job(job_id)

    def fail_job(self, job_id):
        return self.__crawlRepository.fail_job(job_id)

    def save_scraped_pages(self, job_id, pages):
        return self.__crawlRepository.save_scraped_pages(job_id, pages)

    def get_scraped_pages(self):
        pages = self.__crawlRepository.get_scraped_pages()
        if not pages:
            raise HTTPException(status_code=400, detail="Pages not found")
        return pages

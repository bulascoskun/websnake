from app.db.repository.insightRepo import InsightRepository
from app.db.repository.crawlRepo import CrawlRepository
from sqlalchemy.orm import Session


class HomeService:
    def __init__(self, session: Session):
        self.__insightRepository = InsightRepository(session=session)
        self.__crawlRepository = CrawlRepository(session=session)

    def get_stats(self, user_id):
        # 1. get total insights
        total_insights = self.__insightRepository.get_insight_count(user_id)

        # 2. get last crawl

        # 2.1 find job ids
        users_jobs = self.__crawlRepository.check_user_jobs(user_id=user_id)

        if users_jobs:
            job_ids = [uj.job_id for uj in users_jobs]

            last_crawl = self.__crawlRepository.get_last_crawl(job_ids=job_ids)

            get_last_crawl = last_crawl.created_at
        else:
            get_last_crawl = ""

        return {"total_insights": total_insights, "last_crawl": get_last_crawl}

from app.db.repository.insightRepo import InsightRepository
from app.db.repository.crawlRepo import CrawlRepository
from app.service.crawlService import CrawlService
from sqlalchemy.orm import Session


class HomeService:
    def __init__(self, session: Session):
        self.__insightRepository = InsightRepository(session=session)
        self.__crawlRepository = CrawlRepository(session=session)
        self.__crawlService = CrawlService(session=session)

    def get_stats(self, user_id):
        total_insights = 0
        last_crawl = "12:00"

        return total_insights, last_crawl

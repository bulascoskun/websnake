from app.db.repository.insightRepo import InsightRepository
from sqlalchemy.orm import Session


class InsightService:
    def __init__(self, session: Session):
        self.__insightRepository = InsightRepository(session=session)

    def create_insight(self, input, user):
        return

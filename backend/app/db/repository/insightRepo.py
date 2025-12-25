from app.db.models.insight import Insight
from .base import BaseRepository


class InsightRepository(BaseRepository):
    def create_insight(self, user_id, job_id, found, answer, source_hint) -> Insight:
        job = Insight()
        job = Insight(
            user_id=user_id,
            job_id=job_id,
            found=found,
            answer=answer,
            source_hint=source_hint,
        )
        self.session.add(job)
        self.session.commit()
        self.session.refresh(job)
        return job

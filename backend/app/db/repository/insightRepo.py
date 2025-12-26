from app.db.models.insight import Insight
from .base import BaseRepository
from sqlalchemy import func


class InsightRepository(BaseRepository):
    def create_insight(
        self, user_id, job_id, found, answer, source_hint, input
    ) -> Insight:
        job = Insight()
        job = Insight(
            user_id=user_id,
            job_id=job_id,
            found=found,
            answer=answer,
            source_hint=source_hint,
            input=input,
        )
        self.session.add(job)
        self.session.commit()
        self.session.refresh(job)
        return job

    def get_insights_paginated(
        self,
        user_id,
        job_id,
        limit: int,
        offset: int,
    ):
        query = self.session.query(Insight).filter(Insight.user_id == user_id)
        if job_id is not None:
            query = query.filter(Insight.job_id == job_id)

        total = query.with_entities(func.count()).scalar()

        items = query.order_by(Insight.id.desc()).limit(limit).offset(offset).all()

        return items, total

    def get_insight_by_id(self, insight_id: int):
        query = self.session.query(Insight).filter(Insight.id == insight_id).first()
        return query

    def get_insight_count(
        self,
        user_id,
    ):
        query = self.session.query(Insight).filter(Insight.user_id == user_id)

        total = query.with_entities(func.count()).scalar()

        return total

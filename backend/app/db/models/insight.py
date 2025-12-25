from datetime import datetime
from sqlalchemy import String, Boolean, func, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql.sqltypes import DateTime
from app.core.database import Base


class Insight(Base):
    __tablename__ = "insights"

    id: Mapped[int] = mapped_column(primary_key=True)
    job_id: Mapped[int] = mapped_column(Integer, ForeignKey("crawl_jobs.id"))
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    input: Mapped[str] = mapped_column(String)
    found: Mapped[bool] = mapped_column(Boolean)
    answer: Mapped[str] = mapped_column(String)
    source_hint: Mapped[str] = mapped_column(String)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

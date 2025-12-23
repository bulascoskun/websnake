from app.core.database import Base
from sqlalchemy import String, Integer, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column


class ScrapedPage(Base):
    __tablename__ = "scraped_pages"

    id: Mapped[int] = mapped_column(primary_key=True)
    job_id: Mapped[int] = mapped_column(Integer, ForeignKey("crawl_jobs.id"))
    url: Mapped[str] = mapped_column(
        String,
    )
    title: Mapped[str] = mapped_column(String, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)

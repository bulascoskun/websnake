from app.core.database import Base
from sqlalchemy import Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import PrimaryKeyConstraint


class UsersJobs(Base):
    __tablename__ = "users_jobs"
    __table_args__ = (PrimaryKeyConstraint("user_id", "job_id"),)

    job_id: Mapped[int] = mapped_column(Integer, ForeignKey("crawl_jobs.id"))
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))

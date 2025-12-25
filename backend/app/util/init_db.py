from app.core.database import Base, engine

# Models
from app.db.models import user, scraped_page, crawl_job, users_jobs, insight


def create_tables():
    Base.metadata.create_all(bind=engine)

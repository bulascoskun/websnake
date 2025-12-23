from fastapi import BackgroundTasks, APIRouter, Depends
from crawler.main import run_crawler
from app.db.repository.crawlRepo import create_job
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.db.models.scraped_page import ScrapedPage


crawlerRouter = APIRouter()


@crawlerRouter.post("/crawl")
def start_crawler(
    url: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    job = create_job(db, url)

    background_tasks.add_task(
        run_crawler,
        homepage=url,
        job_id=job.id,
    )

    return {"job_id": job.id, "status": job.status}


@crawlerRouter.get("/scraped")
def get_scraped_pages(db: Session = Depends(get_db)):
    pages = db.query(ScrapedPage).limit(200).all()

    return [
        {
            "id": p.id,
            "job_id": p.job_id,
            "url": p.url,
            "title": p.title,
            "description": p.description,
            "body_preview": p.body_preview,
            "h1": p.h1,
        }
        for p in pages
    ]

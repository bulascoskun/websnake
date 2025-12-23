from fastapi import BackgroundTasks, APIRouter, Depends
from crawler.main import run_crawler
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.service.crawlService import CrawlService


crawlerRouter = APIRouter()


@crawlerRouter.post("/crawl")
def start_crawler(
    url: str,
    background_tasks: BackgroundTasks,
    session: Session = Depends(get_db),
):
    job = CrawlService(session=session).create_job(url=url)

    background_tasks.add_task(
        run_crawler,
        homepage=url,
        job_id=job.id,
    )

    return {"job_id": job.id, "status": job.status}


@crawlerRouter.get("/get_scraped_pages")
def register(session: Session = Depends(get_db)):
    try:
        return CrawlService(session=session).get_scraped_pages()
    except Exception as error:
        print(error)
        raise error

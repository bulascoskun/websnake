from fastapi import BackgroundTasks, APIRouter, Depends
from crawler.main import run_crawler
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.service.crawlService import CrawlService
from app.util.protectRoute import get_current_user
from app.db.schema.user import UserOutput
from crawler.domain import get_domain_name
from fastapi import HTTPException


crawlerRouter = APIRouter()


@crawlerRouter.post("/crawl", status_code=202)
def start_crawler(
    url: str,
    background_tasks: BackgroundTasks,
    session: Session = Depends(get_db),
    user: UserOutput = Depends(get_current_user),
):
    domain_name = get_domain_name(url)

    try:
        # 1. Check if job exists
        job_exists = CrawlService(session=session).get_job_by_domain_name(domain_name)

        if not job_exists:
            # Create job
            job = CrawlService(session=session).create_job(url=domain_name)
            background_tasks.add_task(
                run_crawler,
                homepage=url,
                job_id=job.id,
            )
            job = CrawlService(session=session).create_job(url=domain_name)

            # Add relation
            CrawlService(session=session).add_user_job_relation(user.id, job.id)

            return {"message": "Success - 1"}

        # 2. Check if user has job
        user_has_job = CrawlService(session=session).check_user_has_job(
            user.id, job_exists.id
        )

        if user_has_job:
            raise HTTPException(status_code=400, detail="You have already crawled")

        # 3. Only add relation if job_exists && !user_has_job
        if not user_has_job:
            CrawlService(session=session).add_user_job_relation(user.id, job_exists.id)
            return {"message": "Success - 2"}

    except Exception as error:
        print(error)
        raise error


@crawlerRouter.get("/get_scraped_pages", status_code=200)
def get_scraped_pages(
    session: Session = Depends(get_db), user: UserOutput = Depends(get_current_user)
):
    try:
        return CrawlService(session=session).get_scraped_pages()
    except Exception as error:
        print(error)
        raise error

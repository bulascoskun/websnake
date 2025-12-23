from fastapi import BackgroundTasks, APIRouter, Depends
from crawler.main import run_crawler
from app.db.repository.crawlRepo import create_job
from sqlalchemy.orm import Session
from app.core.database import get_db


# from app.db.schema.user import UserInCreate, UserInLogin, UserWithToken, UserOutput
# from app.core.database import get_db
# from sqlalchemy.orm import Session
# from app.service.userService import UserService

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

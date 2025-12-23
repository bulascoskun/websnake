from fastapi import BackgroundTasks, APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.service.crawlService import CrawlService
from app.util.protectRoute import get_current_user
from app.db.schema.user import UserOutput


crawlerRouter = APIRouter()


@crawlerRouter.post("/crawl", status_code=202)
def start_crawler(
    url: str,
    background_tasks: BackgroundTasks,
    session: Session = Depends(get_db),
    user: UserOutput = Depends(get_current_user),
):
    try:
        return CrawlService(session=session).start_crawler(url, background_tasks, user)
    except Exception as error:
        print(error)
        raise error


@crawlerRouter.get("/get_list", status_code=200)
def get_list(
    input_job_id: int,
    page: int,
    per_page: int,
    session: Session = Depends(get_db),
    user: UserOutput = Depends(get_current_user),
):
    try:
        return CrawlService(session=session).get_list(
            input_job_id=int(input_job_id),
            user_id=user.id,
            page=int(page),
            per_page=int(per_page),
        )
    except Exception as error:
        print(error)
        raise error

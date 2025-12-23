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


@crawlerRouter.get("/get_scraped_pages", status_code=200)
def get_scraped_pages(
    session: Session = Depends(get_db), user: UserOutput = Depends(get_current_user)
):
    try:
        return CrawlService(session=session).get_scraped_pages()
    except Exception as error:
        print(error)
        raise error

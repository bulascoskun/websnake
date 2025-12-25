from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.service.insightService import InsightService
from app.util.protectRoute import get_current_user
from app.db.schema.user import UserOutput


insightRouter = APIRouter()


@insightRouter.post("/create_insight", status_code=201)
def create_insight(
    input: str,
    job_id: int,
    session: Session = Depends(get_db),
    user: UserOutput = Depends(get_current_user),
):
    try:
        return InsightService(session=session).create_insight(input, job_id, user)
    except Exception as error:
        print(error)
        raise error


@insightRouter.get("/get_list", status_code=200)
def get_list(
    page: int,
    per_page: int,
    job_id: int | None = None,
    session: Session = Depends(get_db),
    user: UserOutput = Depends(get_current_user),
):
    try:
        return InsightService(session=session).get_list(
            job_id=job_id,
            user_id=user.id,
            page=int(page),
            per_page=int(per_page),
        )
    except Exception as error:
        print(error)
        raise error

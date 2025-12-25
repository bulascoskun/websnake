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

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.service.homeService import HomeService
from app.util.protectRoute import get_current_user
from app.db.schema.user import UserOutput


homeRouter = APIRouter()


@homeRouter.get("/get_stats", status_code=200)
def get_stats(
    session: Session = Depends(get_db),
    user: UserOutput = Depends(get_current_user),
):
    try:
        return HomeService(session=session).get_stats(
            user_id=user.id,
        )
    except Exception as error:
        print(error)
        raise error

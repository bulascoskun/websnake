from app.db.schema.user import (
    UserInCreate,
    UserInLogin,
    UserWithToken,
    UserOutput,
    UserReUpdate,
)
from app.service.userService import UserService
from fastapi import APIRouter, Depends
from app.core.database import get_db
from sqlalchemy.orm import Session
from app.util.protectRoute import get_current_user

authRouter = APIRouter()


@authRouter.post("/login", status_code=200, response_model=UserWithToken)
def login(loginDetails: UserInLogin, session: Session = Depends(get_db)):
    try:
        return UserService(session=session).login(login_details=loginDetails)
    except Exception as error:
        print(error)
        raise error


@authRouter.post("/register", status_code=201, response_model=UserOutput)
def register(registerDetails: UserInCreate, session: Session = Depends(get_db)):
    try:
        return UserService(session=session).signup(user_details=registerDetails)
    except Exception as error:
        print(error)
        raise error


@authRouter.post("/update_user", status_code=200)
def update_user(
    update_details: UserReUpdate,
    session: Session = Depends(get_db),
    user: UserOutput = Depends(get_current_user),
):
    try:
        return UserService(session=session).update_user(
            user_id=user.id,
            update_details=update_details,
        )
    except Exception as error:
        print(error)
        raise error

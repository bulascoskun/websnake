from app.db.repository.userRepo import UserRepository
from app.db.schema.user import (
    UserOutput,
    UserInCreate,
    UserInLogin,
    UserWithToken,
    UserReUpdate,
)
from app.core.security.hashHelper import HashHelper
from app.core.security.authHandler import AuthHandler
from sqlalchemy.orm import Session
from fastapi import HTTPException


class UserService:
    def __init__(self, session: Session):
        self.__userRepository = UserRepository(session=session)

    def signup(self, user_details: UserInCreate) -> UserOutput:
        if self.__userRepository.user_exist_by_email(user_details.email):
            raise HTTPException(
                status_code=400, detail="User with email already exists"
            )

        hashed_password = HashHelper.get_password_hash(
            plain_password=user_details.password
        )
        user_details.password = hashed_password
        return self.__userRepository.create_user(user_data=user_details)

    def login(self, login_details: UserInLogin) -> UserWithToken:
        if not self.__userRepository.user_exist_by_email(email=login_details.email):
            raise HTTPException(status_code=400, detail="Account not found")

        user = self.__userRepository.get_user_by_email(email=login_details.email)
        if HashHelper.verify_password(
            plain_password=login_details.password, hashed_password=user.password
        ):
            token = AuthHandler.sign_jwt(user_id=user.id)
            if token:
                return UserWithToken(
                    first_name=user.first_name,
                    last_name=user.last_name,
                    email=user.email,
                    token=token,
                )

            raise HTTPException(status_code=500, detail="Unable to process request")
        raise HTTPException(status_code=400, detail="Please check your credentials")

    def get_user_by_id(self, user_id: int):
        user = self.__userRepository.get_user_by_id(user_id=user_id)
        if not user:
            raise HTTPException(status_code=400, detail="User not found")
        return user

    def update_user(
        self,
        user_id,
        update_details,
    ) -> UserReUpdate:
        # get_user_by_id
        user = self.__userRepository.get_user_by_id(user_id=user_id)
        if not user:
            raise HTTPException(status_code=400, detail="User not found")

        # update found user with update_details
        updated_user = self.__userRepository.update_user_with_details(
            user, update_details
        )

        return UserReUpdate(
            first_name=updated_user.first_name,
            last_name=updated_user.last_name,
            email=updated_user.email,
        )

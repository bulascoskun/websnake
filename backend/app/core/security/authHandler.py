import jwt
from decouple import config
from typing import cast
import time

JWT_SECRET = cast(str, config("JWT_SECRET"))
JWT_ALGORITHM = cast(str, config("JWT_ALGORITHM", default="HS256"))


class AuthHandler(object):
    @staticmethod
    def sign_jwt(user_id: int):
        payload = {"user_id": user_id, "expires": time.time() + 3600}

        token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
        return token

    @staticmethod
    def decode_jwt(token: str):
        try:
            decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            return decoded_token if decoded_token["expires"] >= time.time() else None
        except Exception:
            return None

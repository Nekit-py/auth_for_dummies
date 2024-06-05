from fastapi.exceptions import HTTPException
from pydantic import EmailStr, Field, model_validator
from typing_extensions import Self

from app.schemas.common import ID, AppBase
from app.schemas.db.tokens import TokenBase


class NameAndMail(AppBase):
    username: str = Field(min_length=10, max_length=50)
    email: EmailStr


class PasswordSet(AppBase):
    password: str = Field(min_length=6, max_length=20)
    repeat_password: str = Field(min_length=6, max_length=20)

    @model_validator(mode='after')
    def pwd_validator(self) -> Self:
        if self.password != self.repeat_password:
            raise HTTPException(status_code=400, detail="Passwords do not match")
        return self


class UserCreate(NameAndMail, PasswordSet):
    pass


class UserUpdate(ID, NameAndMail):
    pass


class UserAdd(NameAndMail):
    password_hash: str
    salt: str


class User(ID, NameAndMail):
    token: TokenBase

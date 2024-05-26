from pydantic import BaseModel, EmailStr, Field, validator
from fastapi.exceptions import HTTPException
from app.schemas.coomon import ID
from uuid import UUID


class NameAndMail(BaseModel):
    name: str = Field(min_length=10, max_length=50)
    email: EmailStr


class PasswordSet(BaseModel):
    password: str = Field(min_length=6, max_length=20)
    repeat_password: str = Field(min_length=6, max_length=20)

    @validator('repeat_password')
    def passwords_match(cls, v, values):
        if v != values['password']:
            raise HTTPException(status_code=400, detail='Passwords do not match')
        return v   


class UserCreate(NameAndMail, PasswordSet):
    pass


class UserUpdate(ID, NameAndMail):
    pass


class UserAdd(NameAndMail):
    password_hash: str
    salt: str


class TokenBase(BaseModel):
    token: UUID = Field(..., alias="access_token")
    token_type: str | None = "bearer"

    @validator("token")
    def hexlify_token(cls, value):
        """Конвертирует UUID в hex строку"""
        return value.hex

    class Config:
        allow_population_by_field_name = True


class User(ID, NameAndMail):
    token: TokenBase

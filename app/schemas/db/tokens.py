from pydantic import Field, validator
from fastapi import Depends
from uuid import UUID
from app.schemas.common import ID, AppBase
from datetime import datetime


class TokenAdd(AppBase):
    user_id: UUID = Depends(ID) 


class TokenBase(AppBase):
    token: UUID = Field(..., alias="access_token")
    token_type: str | None = "bearer"

    @validator("token")
    def hexlify_token(cls, value):
        """Конвертирует UUID в hex строку"""
        return value.hex

    class Config:
        populate_by_name = True


class TokenUpdate(AppBase):
    id: ID
    user_id: ID | None = None
    expires_at: datetime | None = None

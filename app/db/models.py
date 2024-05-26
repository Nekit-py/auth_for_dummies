from sqlalchemy import Column, DateTime, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.sql import text


class Base(DeclarativeBase):
    """
    Общие поля для таблиц
    """

    __table_args__ = {"schema": "auth"}

    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    created_at = Column(DateTime, nullable=False, server_default=text("NOW()"))
    updated_at = Column(DateTime, nullable=True)


class User(Base):
    username = Column(String(50), nullable=False)
    password_hash = Column(String(64), nullable=False)
    salt = Column(String(32), nullable=False)
    email = Column(String(100), nullable=False, unique=True)

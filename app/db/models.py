from datetime import datetime, timedelta

from sqlalchemy import Column, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, relationship
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
    __tablename__ = "users"

    username = Column(String(50), nullable=False)
    password_hash = Column(String(64), nullable=False)
    salt = Column(String(32), nullable=False)
    email = Column(String(100), nullable=False, unique=True)

    tokens = relationship("Token", back_populates="user", cascade="all, delete-orphan")


class Token(Base):
    __tablename__ = "tokens"

    id = Column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    user_id = Column(UUID, ForeignKey("auth.users.id"), nullable=False)
    token = Column(
        String, unique=True, nullable=False, default=text("gen_random_uuid()")
    )
    expires_at = Column(
        DateTime, nullable=False, default=lambda: datetime.utcnow() + timedelta(hours=1)
    )
    created_at = Column(DateTime, server_default=text("NOW()"))

    user = relationship("User", back_populates="tokens")

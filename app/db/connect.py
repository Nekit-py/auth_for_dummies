from typing import AsyncGenerator

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.ext.asyncio import (
    AsyncSession, async_sessionmaker, create_async_engine
)

from app.db.config import Settings
from app.logger.logger import *


logger = logging.getLogger(__name__)
logger.propagate = False

settings = Settings()
async_engine = create_async_engine(settings.database_url_asyncpg)
async_session = async_sessionmaker(async_engine)


async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Возвращает сессию, которая группирует связанные
    операции в рамках одной транзакции.
    Откатывается в случае неудачи и возбуждает исключение.
    """
    session = async_session()
    try:
        yield session
        await session.commit()
    except IntegrityError as error:
        await session.rollback()
        logger.error("Ошибка БД: %s", error)
        raise HTTPException(
            status_code=500, detail="unique constraint error"
        ) from error
    except SQLAlchemyError as error:
        await session.rollback()
        logger.error("Ошибка БД: %s", error)
        raise HTTPException(status_code=500, detail="Ошибка базы данных") from error
    finally:
        await session.close()

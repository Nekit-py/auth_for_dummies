import asyncio

from sqlalchemy.schema import CreateSchema

from app.db.connect import async_engine
from app.db.models import Base
from app.logger.logger import *

logger = logging.getLogger(__name__)
logger.propagate = False


async def migrate_tables():
    """
    Создание таблиц и схемы
    """
    async with async_engine.begin() as conn:
        await conn.execute(CreateSchema("auth", if_not_exists=True))
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Таблицы успешно созданы")


if __name__ == "__main__":
    asyncio.run(migrate_tables())

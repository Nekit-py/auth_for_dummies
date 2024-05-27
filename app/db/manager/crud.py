from typing import Generic, Type, TypeVar
from uuid import UUID

from pydantic import BaseModel, TypeAdapter
from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import models
from app.db.models import Base
from app.schemas.db.tokens import TokenAdd, TokenUpdate
from app.schemas.db.users import UserAdd, UserCreate, UserUpdate

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class BaseCrud(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    """
    Базовые круд-методы для моделей
    """

    def __init__(self, model: Type[ModelType], session: AsyncSession):
        self.model = model
        self.session = session

    async def create(self, item: CreateSchemaType) -> dict[str, UUID]:
        """
        Создание записи в таблице
        """
        entry = self.model(**item.dict())
        self.session.add(entry)
        await self.session.flush()
        return {"id": TypeAdapter(UUID).validate_python(entry.id)}

    async def get(self, id_: UUID) -> ModelType | None:
        """
        Получение записи из таблицы по id
        """
        result = await self.session.execute(
            select(self.model).where(self.model.id == id_)
        )
        record = result.scalars().first()
        return record

    async def list(self) -> list[ModelType]:
        """
        Получение всех записей таблицы
        """
        result = await self.session.execute(select(self.model))
        return result.scalars()

    async def delete(self, id_: UUID) -> None:
        """
        Удаление записи
        """
        query = delete(self.model).where(self.model.id == id_)
        await self.session.execute(query)

    async def update(self, id_: UUID, item: UpdateSchemaType):
        """
        Обновление записи
        """
        await self.session.execute(
            update(self.model)
            .where(self.model.id == id_)
            .values(**item.not_empty_values())
        )


class UserCrud(BaseCrud[models.User, UserAdd, UserUpdate]):
    """
    CRUD для таблтицы Users
    """

    def __init__(self, session: AsyncSession):
        super().__init__(models.User, session)


class TokenCrud(BaseCrud[models.Token, TokenAdd, TokenUpdate]):
    """
    CRUD для таблтицы Users
    """

    def __init__(self, session: AsyncSession):
        super().__init__(models.Token, session)

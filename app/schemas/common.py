from pydantic import BaseModel
from uuid import UUID


class ID(BaseModel):
    id: UUID


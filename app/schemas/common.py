from pydantic import BaseModel
from uuid import UUID
from typing import Iterable


class AppBase(BaseModel):

    @classmethod
    def from_iterable(cls, iterable: Iterable):
        return cls(**{k: v for k, v in zip(cls.__fields__.keys(), iterable)})

class ID(AppBase):
    id: UUID


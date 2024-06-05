from fastapi import APIRouter, Depends

from app.db.connect import get_db_session
from app.db.manager.crud import UserCrud
from app.schemas.db.users import NameAndMail


router = APIRouter(prefix="/v1/users", tags=["Users routes"])


@router.get("/list", status_code=201, response_model=list[NameAndMail])
async def users_list(session=Depends(get_db_session)):
    """
    Список пользователей
    """
    uc = UserCrud(session)
    return await uc.list()


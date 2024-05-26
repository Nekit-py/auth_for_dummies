from fastapi import APIRouter, Depends
from app.db.shemas.users import UserCreate, User
from app.schemas.users import User, UserCreate
from app.db.connect import get_db_session
from app.db.manager.crud import UserCrud


router = APIRouter(prefix="/v1/auth", tags=["Auth"])


@router.post("/sign-up", response_model=User)
async def create_user(user: UserCreate, session=Depends(get_db_session)):
    """
    Регистрация нового пользователя
    """
    uc = UserCrud(session)
    return uc.create(user)

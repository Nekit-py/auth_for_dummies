from fastapi import APIRouter, Depends
from app.schemas.db.users import UserAdd, UserCreate, User, UserCreate
from app.schemas.db.tokens import TokenAdd
from app.db.connect import get_db_session
from app.db.manager.crud import TokenCrud, UserCrud
from app.db.utils import generate_salt, hash_password


router = APIRouter(prefix="/v1/auth", tags=["Auth"])


@router.post("/sign-up", status_code=201)
async def create_user(user: UserCreate, session=Depends(get_db_session)):
    """
    Регистрация нового пользователя
    """
    salt = generate_salt()
    password_hash = hash_password(user.password, salt).hex()
    new_user = UserAdd(username=user.username, email=user.email, password_hash=password_hash, salt=salt.hex())
    async with session.begin():
        uc = UserCrud(session)
        id = await uc.create(new_user)
        tk = TokenCrud(session)
        await tk.create(TokenAdd(user_id=id['id']))
    return {"message": "registered"}

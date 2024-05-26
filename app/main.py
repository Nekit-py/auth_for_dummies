from app.db.utils import  generate_salt, hash_password
from app.schemas.db.users import UserCreate
from app.routes.v1.auth import router as auth
from fastapi import APIRouter, Depends, Response, Request, FastAPI
from app.db.connect import settings
import uvicorn



# app = FastAPI(docs_url=None, redoc_url=None)
app = FastAPI(debug=True)
app.include_router(auth)


@app.get("/", status_code=200)
async def index():
    return {"message": "hello frmo auth!"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=int(settingsHOST_PORT), reload=False)

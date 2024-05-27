import uvicorn
from fastapi import FastAPI

from app.db.connect import settings
from app.routes.v1.auth import router as auth

# app = FastAPI(docs_url=None, redoc_url=None)
app = FastAPI(debug=True)
app.include_router(auth)


@app.get("/", status_code=200)
async def index():
    return {"message": "hello frmo auth!"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=int(settings.HOST_PORT), reload=False)

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    HOST: str | None = None
    DB_PORT: int | None = None
    DB_USER: str | None = None
    DB_PASSWORD: str | None = None
    DB_NAME: str | None = None
    HOST_PORT: int | None = None

    model_config = SettingsConfigDict(env_file="app/db/.env")

    @property
    def database_url_asyncpg(self) -> str:
        """
        Postgres URL
        """
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.HOST}:{self.DB_PORT}/{self.DB_NAME}"

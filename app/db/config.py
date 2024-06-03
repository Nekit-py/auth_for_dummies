from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    HOST: str | None = None
    DB_PORT: int | None = None
    POSTGRES_USER: str | None = None
    POSTGRES_PASSWORD: str | None = None
    POSTGRES_DB: str | None = None
    HOST_PORT: int | None = None

    model_config = SettingsConfigDict(env_file="app/db/.env")

    @property
    def database_url_asyncpg(self) -> str:
        """
        Postgres URL
        """
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.HOST}:{self.DB_PORT}/{self.POSTGRES_DB}"

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = "Musify API"
    app_version: str = "1.0.0"
    environment: str = "development"
    database_url: str = Field(default="", validation_alias="DATABASE_URL")
    redis_url: str = Field(default="", validation_alias="REDIS_URL")
    cors_origins_raw: str = Field(default="*", validation_alias="CORS_ORIGINS")

    @property
    def cors_origins(self) -> list[str]:
        if self.cors_origins_raw == "*":
            return ["*"]
        return [origin.strip() for origin in self.cors_origins_raw.split(",") if origin.strip()]


settings = Settings()

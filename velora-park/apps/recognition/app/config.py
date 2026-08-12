from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    recognition_env: str = "development"
    recognition_host: str = "0.0.0.0"
    recognition_port: int = 8001
    recognition_provider: str = "mock"
    allow_mock_provider: bool = True
    api_callback_base_url: str = "http://localhost:3001/api/v1"
    recognition_ingest_token: str = "dev-recognition-token"
    default_country_profile: str = "DZ"
    yolo_model_path: str = ""
    ocr_provider: str = "mock"


@lru_cache
def get_settings() -> Settings:
    return Settings()

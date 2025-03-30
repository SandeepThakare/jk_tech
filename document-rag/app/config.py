from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    API_PORT: int = 8000
    API_HOST: str = "0.0.0.0"

    DATABASE_URL: str

    AZURE_OPENAI_API_KEY: str = "your_api_key"
    AZURE_OPENAI_ENDPOINT: str = "https://your-resource.openai.azure.com/"
    AZURE_OPENAI_API_VERSION: str = "2023-05-15"
    AZURE_OPENAI_DEPLOYMENT_NAME: str = "your-deployment-name"
    AZURE_OPENAI_EMBEDDING_DEPLOYMENT: str = "embedding-3-large"

    FRONTEND_URL: str = "http://localhost:3000"
    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200
    VECTOR_DIMENSION: int = 1536

    model_config = {
        "env_file": ".env",
        "case_sensitive": True
    }


settings = Settings()

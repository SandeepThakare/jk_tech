from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/doc_qa_db"

    # Azure OpenAI Settings
    AZURE_OPENAI_API_KEY: str = "your-azure-openai-api-key"
    AZURE_OPENAI_ENDPOINT: str = "your-azure-endpoint"
    AZURE_OPENAI_API_VERSION: str = "2023-05-15"
    AZURE_OPENAI_DEPLOYMENT_NAME: str = "your-deployment-name"
    AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME: str = "your-embedding-deployment-name"

    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200
    VECTOR_DIMENSION: int = 1536  # For Azure OpenAI embeddings

    model_config = {
        env_file: str = ".env"
    }


settings = Settings()

from typing import List
from sqlalchemy.orm import Session
from langchain_openai import AzureOpenAIEmbeddings
from ..models.documents import Document
from ..config import settings


class DocumentService:
    def __init__(self):
        self.embeddings = AzureOpenAIEmbeddings(
            azure_deployment=settings.AZURE_OPENAI_EMBEDDING_DEPLOYMENT,
            openai_api_type="azure",
            openai_api_base=settings.AZURE_OPENAI_ENDPOINT,
            openai_api_key=settings.AZURE_OPENAI_API_KEY,
            openai_api_version=settings.AZURE_OPENAI_API_VERSION,
            chunk_size=settings.CHUNK_SIZE
        )

    async def process_document(self, db: Session, title: str, content: str) -> Document:
        embeddings = self.embeddings.embed_documents([content])

        document = Document(
            title=title,
            content=content,
            embedding=embeddings[0]
        )

        db.add(document)
        db.commit()
        db.refresh(document)

        return document

    def get_documents(self, db: Session, skip: int = 0, limit: int = 10) -> List[Document]:
        return db.query(Document).offset(skip).limit(limit).all()

    def get_document(self, db: Session, document_id: int) -> Document:
        return db.query(Document).filter(Document.id == document_id).first()

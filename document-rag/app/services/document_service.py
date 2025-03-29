from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import AzureOpenAIEmbeddings
from sqlalchemy.orm import Session
from typing import List
from ..models.documents import Document
from ..config import settings
import numpy as np


class DocumentService:
    def __init__(self):
        self.embeddings = AzureOpenAIEmbeddings(
            azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
            azure_deployment=settings.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME,
            api_key=settings.AZURE_OPENAI_API_KEY,
            api_version=settings.AZURE_OPENAI_API_VERSION
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.CHUNK_SIZE,
            chunk_overlap=settings.CHUNK_OVERLAP
        )

    async def process_document(self, db: Session, title: str, content: str) -> Document:
        # Split text into chunks
        chunks = self.text_splitter.split_text(content)

        # Generate embeddings for each chunk
        embeddings = await self.embeddings.aembed_query(content)

        # Create document record
        doc = Document(
            title=title,
            content=content,
            embedding=embeddings,
            metadata={"chunks": chunks}
        )

        db.add(doc)
        db.commit()
        db.refresh(doc)
        return doc

    def find_similar_chunks(self, db: Session, query_embedding: List[float],
                            document_ids: List[int] = None, top_k: int = 3):
        # Query documents
        query = db.query(Document)
        if document_ids:
            query = query.filter(Document.id.in_(document_ids))
        documents = query.all()

        # Calculate similarities
        similarities = []
        for doc in documents:
            similarity = self._cosine_similarity(
                query_embedding, doc.embedding)
            similarities.append((similarity, doc))

        # Sort by similarity and return top k
        similarities.sort(key=lambda x: x[0], reverse=True)
        return similarities[:top_k]

    def _cosine_similarity(self, a: List[float], b: List[float]) -> float:
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

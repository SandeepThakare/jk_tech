from typing import List, Dict
import numpy as np
from pymongo import MongoClient
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .config import settings

# SQL Database setup
engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class DocumentStore:
    def __init__(self):
        self.client = MongoClient(os.getenv('MONGODB_URI'))
        self.db = self.client.docqa
        self.chunks = self.db.chunks

    def store_embeddings(self, document_id: int, chunks: List[str], embeddings: List[List[float]]):
        documents = [
            {
                "document_id": document_id,
                "chunk_text": chunk,
                "embedding": embedding
            }
            for chunk, embedding in zip(chunks, embeddings)
        ]
        self.chunks.insert_many(documents)

    def search_similar(self, document_id: int, query_embedding: List[float], top_k: int = 3) -> List[Dict]:
        query_embedding = np.array(query_embedding)
        chunks = list(self.chunks.find({"document_id": document_id}))

        similarities = []
        for chunk in chunks:
            chunk_embedding = np.array(chunk["embedding"])
            similarity = np.dot(query_embedding, chunk_embedding) / (
                np.linalg.norm(query_embedding) *
                np.linalg.norm(chunk_embedding)
            )
            similarities.append((chunk["chunk_text"], similarity))

        similarities.sort(key=lambda x: x[1], reverse=True)
        return [
            {
                "text": text,
                "similarity": float(score)
            }
            for text, score in similarities[:top_k]
        ]

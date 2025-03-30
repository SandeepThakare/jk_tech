from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import asyncio
import boto3
import os

from .database import get_db, engine, Base, DocumentStore
from .services.document_service import DocumentService
from .services.qa_service import QAService
from .schemas import document_schemas
from .models.documents import Document
from .config import settings
from .document_processor import DocumentProcessor
from .embeddings import EmbeddingService
from pydantic import BaseModel
from .vector_store import VectorStore

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Document QA System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

document_service = DocumentService()
qa_service = QAService()

# Initialize services
s3 = boto3.client('s3',
                  aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                  aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
                  region_name=os.getenv('AWS_REGION')
                  )

document_processor = DocumentProcessor()
embedding_service = EmbeddingService()
vector_store = VectorStore()


class ProcessDocumentRequest(BaseModel):
    documentId: int
    s3Key: str
    s3Url: str
    mimeType: str


@app.post("/process")
async def process_document(request: ProcessDocumentRequest):
    try:
        os.makedirs("temp", exist_ok=True)

        local_path = f"temp/{request.s3Key.split('/')[-1]}"
        s3.download_file(
            os.getenv('AWS_BUCKET_NAME'),
            request.s3Key,
            local_path
        )

        text = document_processor.extract_text(local_path, request.mimeType)

        chunks = document_processor.chunk_text(text)
        embeddings = embedding_service.create_embeddings(chunks)

        vector_store.store_embeddings(
            document_id=request.documentId,
            chunks=chunks,
            embeddings=embeddings
        )

        os.remove(local_path)

        return {"status": "success"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class QueryRequest(BaseModel):
    documentId: int
    query: str
    topK: Optional[int] = 3


@app.post("/query")
async def query_document(request: QueryRequest):
    try:
        query_embedding = embedding_service.create_embedding(request.query)

        results = vector_store.search_similar(
            document_id=request.documentId,
            query_embedding=query_embedding,
            top_k=request.topK
        )

        return {
            "results": results
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/documents/", response_model=document_schemas.Document)
async def create_document(
    title: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    content = await file.read()
    content_text = content.decode("utf-8")

    try:
        document = await document_service.process_document(db, title, content_text)
        return document
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/qa/", response_model=document_schemas.QuestionResponse)
async def ask_question(
    question_request: document_schemas.QuestionRequest,
    db: Session = Depends(get_db)
):
    try:
        response = await qa_service.get_answer(
            db,
            question_request.question,
            question_request.document_ids
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/documents/", response_model=List[document_schemas.Document])
def get_documents(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    documents = db.query(Document).offset(skip).limit(limit).all()
    return documents

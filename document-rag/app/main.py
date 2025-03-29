from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import asyncio

from .database import get_db, engine, Base
from .services.document_service import DocumentService
from .services.qa_service import QAService
from .schemas import document_schemas

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Document QA System")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

document_service = DocumentService()
qa_service = QAService()


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

from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime


class DocumentBase(BaseModel):
    title: str
    content: str


class DocumentCreate(DocumentBase):
    pass


class Document(DocumentBase):
    id: int
    embedding: Optional[List[float]]
    metadata: Optional[Dict]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True


class QuestionRequest(BaseModel):
    question: str
    document_ids: Optional[List[int]] = None


class QuestionResponse(BaseModel):
    answer: str
    source_documents: List[str]

import pytest
from app.document_processor import DocumentProcessor
import os


@pytest.fixture
def document_processor():
    return DocumentProcessor()


@pytest.fixture
def sample_pdf(tmp_path):
    pdf_path = tmp_path / "test.pdf"
    return str(pdf_path)


def test_extract_text_from_pdf(document_processor, sample_pdf):
    text = document_processor.extract_text(sample_pdf, "application/pdf")
    assert isinstance(text, str)
    assert len(text) > 0


def test_chunk_text(document_processor):
    text = "This is a test document. " * 100
    chunks = document_processor.chunk_text(text)
    assert len(chunks) > 0
    assert all(isinstance(chunk, str) for chunk in chunks)
    assert all(len(chunk) <= document_processor.chunk_size for chunk in chunks)

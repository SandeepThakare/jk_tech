from typing import List
import PyPDF2
import docx
from transformers import AutoTokenizer


class DocumentProcessor:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained(
            'sentence-transformers/all-MiniLM-L6-v2')
        self.chunk_size = 256  # Adjust based on your needs
        self.overlap = 64      # Adjust based on your needs

    def extract_text(self, file_path: str, mime_type: str) -> str:
        if mime_type == 'application/pdf':
            return self._extract_from_pdf(file_path)
        elif mime_type in ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']:
            return self._extract_from_docx(file_path)
        elif mime_type == 'text/plain':
            return self._extract_from_txt(file_path)
        else:
            raise ValueError(f"Unsupported mime type: {mime_type}")

    def _extract_from_pdf(self, file_path: str) -> str:
        text = ""
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text()
        return text

    def _extract_from_docx(self, file_path: str) -> str:
        doc = docx.Document(file_path)
        return " ".join([paragraph.text for paragraph in doc.paragraphs])

    def _extract_from_txt(self, file_path: str) -> str:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()

    def chunk_text(self, text: str) -> List[str]:
        # Tokenize the text
        tokens = self.tokenizer.tokenize(text)
        chunks = []

        # Create chunks with overlap
        for i in range(0, len(tokens), self.chunk_size - self.overlap):
            chunk_tokens = tokens[i:i + self.chunk_size]
            chunk_text = self.tokenizer.convert_tokens_to_string(chunk_tokens)
            chunks.append(chunk_text)

        return chunks

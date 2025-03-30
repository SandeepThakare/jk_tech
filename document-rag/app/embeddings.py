from typing import List
from sentence_transformers import SentenceTransformer


class EmbeddingService:
    def __init__(self):
        # Load the model
        self.model = SentenceTransformer(
            'sentence-transformers/all-MiniLM-L6-v2')

    def create_embedding(self, text: str) -> List[float]:
        # Create embedding for a single text
        embedding = self.model.encode(text)
        return embedding.tolist()

    def create_embeddings(self, texts: List[str]) -> List[List[float]]:
        # Create embeddings for multiple texts
        embeddings = self.model.encode(texts)
        return embeddings.tolist()

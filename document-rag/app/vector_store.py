from typing import List, Dict
import numpy as np
import faiss
import os
import pickle
from datetime import datetime


class VectorStore:
    def __init__(self):
        self.index = None
        self.chunks = []
        self.storage_dir = "vector_store"
        os.makedirs(self.storage_dir, exist_ok=True)

    def store_embeddings(self, document_id: int, chunks: List[str], embeddings: List[List[float]]):
        embeddings_array = np.array(embeddings).astype('float32')

        if self.index is None:
            dimension = len(embeddings[0])
            self.index = faiss.IndexFlatL2(dimension)

        # Store the chunks and their embeddings
        start_idx = len(self.chunks)
        self.chunks.extend([{
            'document_id': document_id,
            'text': chunk,
            'index': start_idx + i
        } for i, chunk in enumerate(chunks)])

        # Add embeddings to FAISS index
        self.index.add(embeddings_array)

        # Save the index and chunks
        self._save_state(document_id)

    def search_similar(self, document_id: int, query_embedding: List[float], top_k: int = 3) -> List[Dict]:
        if self.index is None:
            self._load_state(document_id)
            if self.index is None:
                return []

        # Convert query embedding to numpy array
        query_array = np.array([query_embedding]).astype('float32')

        # Search the index
        distances, indices = self.index.search(query_array, top_k)

        # Get the corresponding chunks
        results = []
        for idx, distance in zip(indices[0], distances[0]):
            if idx < len(self.chunks):
                chunk = self.chunks[idx]
                if chunk['document_id'] == document_id:
                    results.append({
                        'text': chunk['text'],
                        # Convert distance to similarity score
                        'similarity': float(1 / (1 + distance))
                    })

        return results

    def _save_state(self, document_id: int):
        # Save FAISS index
        index_path = os.path.join(
            self.storage_dir, f"index_{document_id}.faiss")
        faiss.write_index(self.index, index_path)

        # Save chunks
        chunks_path = os.path.join(
            self.storage_dir, f"chunks_{document_id}.pkl")
        with open(chunks_path, 'wb') as f:
            pickle.dump(self.chunks, f)

    def _load_state(self, document_id: int):
        index_path = os.path.join(
            self.storage_dir, f"index_{document_id}.faiss")
        chunks_path = os.path.join(
            self.storage_dir, f"chunks_{document_id}.pkl")

        if os.path.exists(index_path) and os.path.exists(chunks_path):
            self.index = faiss.read_index(index_path)
            with open(chunks_path, 'rb') as f:
                self.chunks = pickle.load(f)

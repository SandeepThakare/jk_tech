from langchain.llms import AzureOpenAI
from langchain.chains import RetrievalQAWithSourcesChain
from langchain_community.embeddings import AzureOpenAIEmbeddings
from sqlalchemy.orm import Session
from typing import List, Dict
from .document_service import DocumentService
from ..config import settings


class QAService:
    def __init__(self):
        self.llm = AzureOpenAI(
            temperature=0,
            azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
            azure_deployment=settings.AZURE_OPENAI_DEPLOYMENT_NAME,
            api_key=settings.AZURE_OPENAI_API_KEY,
            api_version=settings.AZURE_OPENAI_API_VERSION
        )
        self.embeddings = AzureOpenAIEmbeddings(
            api_key=settings.AZURE_OPENAI_API_KEY,
            azure_deployment=settings.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME,
            azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
            api_version=settings.AZURE_OPENAI_API_VERSION,
            chunk_size=1,
            model="text-embedding-ada-002"
        )
        self.document_service = DocumentService()

    async def get_answer(self, db: Session, question: str,
                         document_ids: List[int] = None) -> Dict:
        question_embedding = await self.embeddings.aembed_query(question)

        similar_docs = self.document_service.find_similar_chunks(
            db, question_embedding, document_ids
        )

        if not similar_docs:
            return {
                "answer": "No relevant documents found to answer the question.",
                "source_documents": []
            }

        context = "\n\n".join([doc[1].content for doc in similar_docs])

        prompt = f"""
        Context: {context}
        
        Question: {question}
        
        Please provide a detailed answer based on the context above. If the context
        doesn't contain relevant information, please state that.
        
        Answer:"""

        response = await self.llm.agenerate([prompt])

        return {
            "answer": response.generations[0][0].text.strip(),
            "source_documents": [doc[1].title for doc in similar_docs]
        }

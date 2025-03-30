# Document RAG System

A Retrieval-Augmented Generation (RAG) system for document processing and querying using FastAPI and Azure OpenAI.

## Architecture

The system follows Clean Architecture principles with the following layers:

- Presentation Layer (FastAPI endpoints)
- Service Layer (Business logic)
- Data Layer (Vector store and database)

### Key Components

- `DocumentProcessor`: Handles document text extraction and chunking
- `EmbeddingService`: Manages document embeddings using Azure OpenAI
- `VectorStore`: Implements FAISS-based vector similarity search
- `DocumentService`: Orchestrates document processing workflow

## Development Setup

### Prerequisites

- Python 3.10+
- PostgreSQL
- Azure OpenAI account

### Local Development

1. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements/dev.txt
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your settings
```

4. Run database migrations:

```bash
alembic upgrade head
```

5. Start the development server:

```bash
uvicorn app.main:app --reload
```

### Running Tests

```bash
pytest tests/
```

## Production Deployment

### Using Docker

1. Build the image:

```bash
docker build -t document-rag .
```

2. Run with Docker Compose:

```bash
docker-compose up -d
```

### Manual Deployment

1. Install production dependencies:

```bash
pip install -r requirements/prod.txt
```

2. Set environment variables
3. Run database migrations
4. Start with gunicorn:

```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## API Documentation

API documentation is available at `/docs` when the server is running.

## Design Decisions

1. **FAISS for Vector Search**: Chosen for its efficiency and performance in similarity search
2. **Azure OpenAI**: Used for reliable embedding generation
3. **Clean Architecture**: Ensures separation of concerns and maintainability

## Contributing

1. Create a feature branch
2. Make changes
3. Write tests
4. Submit a pull request

## License

MIT License

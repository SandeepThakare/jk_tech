# Document QA System

A complete document management and question-answering system using React, Node.js, and Python.

## Architecture

The system consists of three main components:

1. **React Frontend**: User interface for document management and QA
2. **Node.js Backend**: Handles document storage and user management
3. **Python RAG Service**: Processes documents and provides question-answering capabilities

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Git

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/document-qa.git
cd document-qa
```

2. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your settings
```

3. Start the services:

```bash
docker-compose up -d
```

The services will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- RAG Service: http://localhost:8000

## Development

### Frontend (React)

```bash
cd react-frontend
npm install
npm run dev
```

### Backend (Node.js)

```bash
cd nodejs-backend
npm install
npm run dev
```

### RAG Service (Python)

```bash
cd document-rag
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements/dev.txt
uvicorn app.main:app --reload
```

## Testing

Each component has its own test suite:

```bash
# Frontend tests
cd react-frontend
npm test

# Backend tests
cd nodejs-backend
npm test

# RAG service tests
cd document-rag
pytest
```

## Deployment

1. Configure environment variables for production
2. Build and start services:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Documentation

- Frontend: [react-frontend/README.md](react-frontend/README.md)
- Backend: [nodejs-backend/README.md](nodejs-backend/README.md)
- RAG Service: [document-rag/README.md](document-rag/README.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

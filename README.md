# Document QA System

This project consists of multiple applications that work together:

## Port Configuration

- Frontend (React): Running on `http://localhost:3000`
- Node.js Auth Backend: Running on `http://localhost:5000`
- Document RAG API (Python): Running on `http://localhost:8000`
- Database: PostgreSQL on port `5432`

## Starting the Applications

1. **Start the Document RAG API**

   ```bash
   cd document-rag
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   python run.py
   ```

   The API will be available at `http://localhost:8000`

2. **Start the Node.js Backend**

   ```bash
   cd nodejs-backend
   npm install
   npm run dev
   ```

   The authentication service will be available at `http://localhost:5000`

3. **Start the Frontend**

   ```bash
   cd frontend
   npm install
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

4. **Database Setup**
   - Ensure PostgreSQL is running on port 5432
   - Create a database named 'doc_qa_db'
   ```bash
   createdb doc_qa_db
   ```

## Environment Setup

1. **Document RAG API**

   - Copy `document-rag/.env.example` to `document-rag/.env`
   - Update the values with your Azure OpenAI credentials

2. **Node.js Backend**

   - Copy `nodejs-backend/.env.example` to `nodejs-backend/.env`
   - Update the database and JWT configurations

3. **Frontend**
   - Copy `.env.example` to `.env`
   - Update the API URLs if needed

## API Documentation

- Document RAG API: `http://localhost:8000/docs`
- Node.js Auth API: `http://localhost:5000/api-docs`

## Common Issues

1. **Port Conflicts**

   - Frontend (3000): Set different port in frontend/.env
   - Node.js Backend (5000): Set different port in nodejs-backend/.env
   - Document RAG API (8000): Set different port in document-rag/.env
   - Database (5432): Set different port in database configuration

2. **CORS Issues**

   - Ensure FRONTEND_URL in both backend .env files matches your frontend's actual URL
   - Check that all services are running on their expected ports

3. **Database Connection**
   - Make sure PostgreSQL is running
   - Check the database configurations in your .env files
   - Verify database credentials and permissions

## Development Tools

- **Recommended VS Code Extensions**
  - ESLint
  - Prettier
  - GitLens
  - PostgreSQL

## Support

For additional support or questions, please:

- Create an issue in the repository
- Contact the development team
- Check the documentation in the `docs` folder

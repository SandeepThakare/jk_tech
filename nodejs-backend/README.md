# Authentication Backend Service

This is the authentication and document management service built with Node.js and Express.

## Setup Instructions

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (Node Package Manager)
- PostgreSQL (v12 or higher)

### Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**

   - Copy `.env.example` to `.env`
   - Update the configurations:
     ```
     PORT=5000
     HOST=0.0.0.0
     DB_HOST=localhost
     ...
     ```

3. **Database Setup**

   - Ensure PostgreSQL is running
   - Create the database:
     ```bash
     createdb doc_qa_db
     ```

4. **Start the Server**

   ```bash
   # Development
   npm run dev

   # Production
   npm run build
   npm start
   ```

   The server will run on `http://localhost:5000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run typeorm` - Run TypeORM commands

### API Endpoints

- Authentication:

  - POST `/auth/register` - Register new user
  - POST `/auth/login` - User login

- Documents:
  - POST `/documents` - Upload document
  - GET `/documents` - List documents
  - GET `/documents/:id` - Get document details

### Environment Variables

```env
PORT=5000
HOST=0.0.0.0
FRONTEND_URL=http://localhost:3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=doc_qa_db
JWT_SECRET=your-secret-key
PYTHON_SERVICE_URL=http://localhost:8000
```

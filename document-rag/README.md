# Backend Application Setup

This is the backend API service built with Node.js and Express.

## Setup Instructions

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (Node Package Manager)
- MongoDB (v4.4 or higher)
- Git

### Installation

1. **Navigate to Backend Directory**

   ```bash
   cd backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   - Create a `.env` file in the backend directory
   - Add the following configurations:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/your-database-name
     JWT_SECRET=your-secret-key
     NODE_ENV=development
     ```

4. **Database Setup**

   - Start MongoDB service
   - The application will create necessary collections automatically

5. **Start Server**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:3000`

### Available Scripts

- `npm run dev` - Runs the server in development mode
- `npm start` - Runs the server in production mode
- `npm test` - Runs the test suite
- `npm run lint` - Runs ESLint
- `npm run format` - Formats code using Prettier

### Project Structure

```
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
├── tests/
├── package.json
└── README.md
```

### API Documentation

- Swagger documentation available at `/api-docs`
- API endpoints follow RESTful conventions
- All protected routes require JWT authentication

### Database Schema

The MongoDB collections include:

- Users
- [Other collections...]

### Error Handling

- All errors follow a standard format
- HTTP status codes are properly implemented
- Error logging is configured

### Testing

```bash
npm test
```

- Unit tests using Jest
- Integration tests for API endpoints
- Maintain minimum 80% coverage

### Production Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Start production server:
   ```bash
   npm start
   ```

### Security Measures

- JWT authentication
- Request rate limiting
- Input validation
- XSS protection
- CORS configuration

### Logging

- Development logs in console
- Production logs in files
- Error tracking configured

# Document RAG API

## Azure OpenAI Setup

1. **Create Azure OpenAI Resource**

   - Go to Azure Portal
   - Create a new Azure OpenAI resource
   - Note down the endpoint and API key

2. **Create Model Deployments**

   a. Text Embeddings Model:

   - Model: text-embedding-ada-002
   - Suggested deployment name: text-embedding-ada-002-deployment
   - This is used for creating document embeddings and similarity search

   b. GPT Model:

   - Model: gpt-35-turbo or gpt-4
   - Suggested deployment name: gpt-35-turbo-deployment
   - This is used for question answering

3. **Configure Environment Variables**
   ```env
   AZURE_OPENAI_API_KEY=your-api-key
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
   AZURE_OPENAI_API_VERSION=2023-05-15
   AZURE_OPENAI_DEPLOYMENT_NAME=gpt-35-turbo-deployment
   AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME=text-embedding-ada-002-deployment
   ```

## Usage

The API uses these deployments for:

- Document processing: Uses the embedding model to create vector representations of text
- Question answering: Uses the GPT model to generate answers based on relevant document chunks

Make sure both deployments are active and properly configured before running the application.

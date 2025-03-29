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

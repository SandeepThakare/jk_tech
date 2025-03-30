# Frontend Application

This is the frontend application built with React.

## Setup Instructions

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (Node Package Manager)

### Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**

   - Copy `.env.example` to `.env`
   - Update if needed:
     ```
     PORT=3000
     REACT_APP_AUTH_API_URL=http://localhost:5000
     REACT_APP_DOC_API_URL=http://localhost:8000
     ```

3. **Start Development Server**

   ```bash
   npm start
   ```

   The application will run on `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the development server
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run lint` - Runs ESLint
- `npm run format` - Formats code using Prettier

### API Configuration

The frontend communicates with two backend services:

- Authentication API: `http://localhost:5000`
- Document RAG API: `http://localhost:8000`

### Environment Variables

```env
PORT=3000
REACT_APP_AUTH_API_URL=http://localhost:5000
REACT_APP_DOC_API_URL=http://localhost:8000
```

### Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── styles/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

### Development Guidelines

1. **Component Creation**

   - Use functional components with hooks
   - Place reusable components in `components/`
   - Place page components in `pages/`

2. **Styling**

   - Use CSS modules or styled-components
   - Follow BEM naming convention

3. **State Management**
   - Use React Context for simple state
   - Redux for complex state management

### Testing

```bash
npm test
```

- Write tests for all components
- Maintain minimum 80% coverage

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

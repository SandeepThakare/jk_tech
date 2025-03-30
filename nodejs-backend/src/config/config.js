require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  host: process.env.HOST || "0.0.0.0",
  database: {
    url: process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/doc_qa_db'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
    bucketName: process.env.AWS_BUCKET_NAME
  },
  pythonService: {
    url: process.env.PYTHON_SERVICE_URL || "http://localhost:8000",
  },
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  },
};

module.exports = { config }; 
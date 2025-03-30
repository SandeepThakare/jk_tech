const express = require('express');
const cors = require('cors');
const { config } = require('./config/config');
const authRoutes = require('./auth/routes/auth.routes');
const documentRoutes = require('./documents/routes/document.routes');
const sequelize = require('./config/database');

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/documents', documentRoutes);

app.use('/api', apiRouter);

// Force sync to recreate tables
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 
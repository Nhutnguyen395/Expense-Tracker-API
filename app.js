import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authoRoutes.js';
import authController from './routes/authoController.js';

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expense', expenseRoutes);

// Database connection
const MONGODB_URI = process.evn.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.error('Could not connect to MongoDB'), err);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { connectDB } from './lib/db';
import authRoutes from './routes/auth.route';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
  connectDB();
});
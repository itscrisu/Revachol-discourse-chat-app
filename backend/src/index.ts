import dotenv from 'dotenv';
import express, { Application } from 'express';
import { connectDB } from './lib/db';
import authRoutes from './routes/auth.route';
import messageRoutes from './routes/message.route';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
  connectDB();
});
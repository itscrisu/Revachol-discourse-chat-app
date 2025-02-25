import express, { Application, Request, Response } from 'express';
import authRoutes from './routes/auth.route';

const app: Application = express();

app.use('/api/auth', authRoutes);

app.listen(5001, () => {
  console.log('server running on port 5001');
});
import express, { NextFunction, Request, Response } from 'express';
import { login, logout, signup } from '../controllers/auth.controller';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await signup(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.post('/login', login);

router.post('/logout', logout);

export default router;
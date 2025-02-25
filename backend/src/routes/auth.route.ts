import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/signup', (req: Request, res: Response) => {
  res.send('signup route');
});

router.get('/login', (req: Request, res: Response) => {
  res.send('login route');
});

router.get('/logout', (req: Request, res: Response) => {
  res.send('logout route');
});

export default router;
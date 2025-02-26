import express, { NextFunction, Request, Response } from 'express';
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/auth.controller';
import { wrapHandler } from '../lib/utils';
import { protectRoute } from '../middleware/auth.middleware';
import type { AuthRequest } from '../types/auth';

const router = express.Router();

router.post('/signup', wrapHandler(signup));
router.post('/login', wrapHandler(login));
router.post('/logout', wrapHandler(logout));
router.put('/update-profile', wrapHandler(async (req: Request, res: Response, next: NextFunction) => {
  await protectRoute(req as AuthRequest, res, async () => {
    await updateProfile(req as AuthRequest, res, next);
  });
}));
router.get('/check', wrapHandler(async (req: Request, res: Response, next: NextFunction) => {
  await protectRoute(req as AuthRequest, res, async () => {
    checkAuth(req as AuthRequest, res, next);
  })
}));

export default router;
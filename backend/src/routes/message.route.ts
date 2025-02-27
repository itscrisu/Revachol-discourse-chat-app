import type { Request, Response } from 'express';
import express from 'express';
import { getMessages, getUsersFromSidebar, sendMessage } from '../controllers/message.controller';
import { wrapHandler } from '../lib/utils';
import { protectRoute } from '../middleware/auth.middleware';
import type { AuthRequest } from '../types/auth';

const router = express.Router();

router.get('/users', wrapHandler(async (req: Request, res: Response) => {
  await protectRoute(req as AuthRequest, res, async () => {
    await getUsersFromSidebar(req as AuthRequest, res);
  });
}));

router.get('/:id', wrapHandler(async (req: Request, res: Response) => {
  await protectRoute(req as AuthRequest, res, async () => {
    await getMessages(req as AuthRequest, res);
  });
}));

router.post('/send/:id', wrapHandler(async (req: Request, res: Response) => {
  await protectRoute(req as AuthRequest, res, async () => {
    await sendMessage(req as AuthRequest, res);
  });
}));

export default router;
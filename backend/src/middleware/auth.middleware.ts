import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import type { AuthRequest } from '../types/auth';

interface JwtPayload {
  userId: string;
}

export const protectRoute = async (req: AuthRequest, res: Response, next: NextFunction) => {
 try {
  const token = req.cookies?.jwt || req.headers.cookie?.split(';').find(c => c.trim().startsWith('jwt='))?.split('=')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

  if(!decoded) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }

  const user = await User.findById(decoded.userId).select('-password');
  
  if(!user) {
    return res.status(401).json({ error: 'Unauthorized - User not found' });
  }

  req.user = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    profilePic: user.profilePic || undefined
  };

  next()
 } catch (error: unknown) {
  console.error('Error in protectRoute middleware:', error instanceof Error ? error.message : 'Unknown error');
  res.status(401).json({ error: 'Unauthorized' });
 }
}

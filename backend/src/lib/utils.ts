import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const generateToken = (userId: string | Types.ObjectId, res: Response) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const token = jwt.sign({ userId: userId.toString() }, jwtSecret, {
    expiresIn: '7d',
  });

  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevents XSS attacks cross-site scripting
    sameSite: 'strict', // CSRF attacks cross-site request forgery
    secure: process.env.NODE_ENV !== 'development',
  });

  return token;
}
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

export interface AuthRequest extends Request {
  user: {
    _id: Types.ObjectId;
    email: string;
    fullName: string;
    profilePic?: string;
  }
} 

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | any;
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { generateToken } from '../lib/utils';
import User from '../models/user.model';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, fullName } = req.body;
  try {

    if (!fullName || !email || !password){
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if(password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      email: email, 
      password: hashedPassword
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      
      return res.status(201).json({ 
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
       });
    } else {
      return res.status(500).json({ error: 'Failed to save user'});
    }
  } catch (error) {
    console.error('Signup error (controller):', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

export const login = (req: Request, res: Response) => {
  res.send('login route');
};

export const logout = (req: Request, res: Response) => {
  res.send('logout route');
};

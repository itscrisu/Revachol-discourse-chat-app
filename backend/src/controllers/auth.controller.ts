import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import { generateToken } from '../lib/utils';
import User from '../models/user.model';
import type { AuthRequest } from '../types/auth';

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

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
    
  } catch (error) {
    console.error('Login error (controller):', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0,
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error (controller):', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { profilePic } = req.body;

    const userId = req.user._id;

    if(!profilePic) {
      return res.status(400).json({ error: 'Profile picture is required' });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId, {
      profilePic: uploadResponse.secure_url}, {new: true});

      res.status(200).json({updatedUser});
    } catch (error: unknown) {
      console.error('Error in update profile controller:', error instanceof Error ? error.message : 'Unknown error');
      res.status(500).json({ error: 'Internal server error' });
      next(error);
    }
};

export const checkAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(req.user);
  } catch (error: unknown) {
    console.error('Error in check auth controller:', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
}
import { v2 as cloudinary } from 'cloudinary';
import type { Response } from 'express';
import Message from '../models/message.model';
import User from '../models/user.model';
import type { AuthRequest } from '../types/auth';

export const getUsersFromSidebar = async (req: AuthRequest, res: Response) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } });
    res.status(200).json(filteredUsers);
  } catch (error: unknown) {
    console.error('Error fetching users from sidebar:', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { id: userToChatId } = req.params; // format name for better understanding
    const myId = req.user._id;
    // find messages between logged in user and user to chat
    // $or operator is used to find messages between two users
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error: unknown) {
    console.error('Error fetching messages:', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params; // rename for better understanding
    const senderId = req.user._id;

    let imageUrl;
    if(image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });
      await newMessage.save();

      // TODO: add realtime functionality after installing socket.io

      res.status(201).json(newMessage);
      
  } catch (error: unknown) {
    console.error('Error sending message:', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({ message: 'Internal server error' });
  }
}

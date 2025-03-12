import express from 'express';
import {
	getMe,
	login,
	logout,
	signup,
	updateAllAvatars,
	updateProfile
} from '../controllers/auth.controller.js';
import protectRoute from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/me', protectRoute, getMe);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/update-avatars', updateAllAvatars);
router.put('/profile', protectRoute, updateProfile);

export default router;

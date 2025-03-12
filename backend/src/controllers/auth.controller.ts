import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import prisma from '../lib/db.js';
import generateToken from '../lib/utils.js';

const getAvatarUrl = (username: string, gender: string) => {
	const styles = {
		male: [
			'adventurer', 
			'adventurer-neutral', 
			'pixel-art', 
			'lorelei', 
			'micah' 
		],
		female: [
			'adventurer', 
			'adventurer-neutral',
			'pixel-art',
			'lorelei', 
			'micah' 
		]
	};

	const usernameSum = [...username].reduce((sum, char) => sum + char.charCodeAt(0), 0);
	const styleArray = gender === 'male' ? styles.male : styles.female;
	const selectedStyle = styleArray[usernameSum % styleArray.length];
	
	const seed = username.toLowerCase().replace(/[^a-z0-9]/g, '');
	
	const backgroundColor = gender === 'male' ? '8b4513' : '7c3030';
	
	return `https://api.dicebear.com/7.x/${selectedStyle}/svg?seed=${seed}&backgroundColor=${backgroundColor}`;
};

export const signup = async (req: Request, res: Response) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (!fullName || !username || !password || !confirmPassword || !gender) {
			return res.status(400).json({ error: 'Please fill in all fields' });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await prisma.user.findUnique({ where: { username } });

		if (user) {
			return res.status(400).json({ error: 'Username already exists' });
		}

		const salt = await bcryptjs.genSalt(10); // common value that everyone uses
		const hashedPassword = await bcryptjs.hash(password, salt); // hash the password

		const profilePic = getAvatarUrl(username, gender);

		const newUser = await prisma.user.create({
			data: {
				fullName,
				username,
				password: hashedPassword,
				gender,
				profilePic,
			},
		});

		if (newUser) {
			generateToken(newUser.id, res);

			res.status(201).json({
				id: newUser.id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: 'Invalid user data' });
		}
	} catch (error: unknown) {
		console.log(
			'Error in signup controller',
			error instanceof Error ? error.message : 'Unknown error',
		);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await prisma.user.findUnique({ where: { username } });

		if (!user) {
			return res.status(400).json({ error: 'Invalid credentials' });
		}

		const isPasswordCorrect = await bcryptjs.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ error: 'Invalid credentials' });
		}

		let updatedUser = user;
		if (user.profilePic.includes('avatar.iran.liara.run')) {
			const newProfilePic = getAvatarUrl(user.username, user.gender);
			updatedUser = await prisma.user.update({
				where: { id: user.id },
				data: { profilePic: newProfilePic },
			});
		}

		generateToken(updatedUser.id, res);

		res.status(200).json({
			id: updatedUser.id,
			fullName: updatedUser.fullName,
			username: updatedUser.username,
			profilePic: updatedUser.profilePic,
		});
	} catch (error: unknown) {
		console.log(
			'Error in login controller',
			error instanceof Error ? error.message : 'Unknown error',
		);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		res.cookie('jwt', '', { maxAge: 0 });
		res.status(200).json({ message: 'Logged out successfully' });
	} catch (error: unknown) {
		console.log(
			'Error in logout controller',
			error instanceof Error ? error.message : 'Unknown error',
		);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const getMe = async (req: Request, res: Response) => {
	try {
		const user = await prisma.user.findUnique({ where: { id: req.user.id } });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		let updatedUser = user;
		if (user.profilePic.includes('avatar.iran.liara.run')) {
			const newProfilePic = getAvatarUrl(user.username, user.gender);
			updatedUser = await prisma.user.update({
				where: { id: user.id },
				data: { profilePic: newProfilePic },
			});
		}

		res.status(200).json({
			id: updatedUser.id,
			fullName: updatedUser.fullName,
			username: updatedUser.username,
			profilePic: updatedUser.profilePic,
		});
	} catch (error: unknown) {
		console.log(
			'Error in getMe controller',
			error instanceof Error ? error.message : 'Unknown error',
		);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const updateAllAvatars = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();
		const updatedUsers = [];

		for (const user of users) {
			const newProfilePic = getAvatarUrl(user.username, user.gender);
			const updatedUser = await prisma.user.update({
				where: { id: user.id },
				data: { profilePic: newProfilePic },
			});
			updatedUsers.push(updatedUser);
		}

		res.status(200).json({ 
			message: `Successfully updated ${updatedUsers.length} avatars`,
			users: updatedUsers.map(u => ({ id: u.id, username: u.username }))
		});
	} catch (error: unknown) {
		console.log(
			'Error updating avatars',
			error instanceof Error ? error.message : 'Unknown error',
		);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const updateProfile = async (req: Request, res: Response) => {
	try {
		const userId = req.user.id;
		const { fullName, avatarStyle } = req.body;
		
		// Validation
		if (!fullName && !avatarStyle) {
			return res.status(400).json({ error: 'No changes provided' });
		}
		
		const user = await prisma.user.findUnique({ where: { id: userId } });
		
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		
		const updateData: { fullName?: string; profilePic?: string } = {};
		
		if (fullName) {
			updateData.fullName = fullName;
		}
		
		if (avatarStyle) {
			const styles = {
				male: ['adventurer', 'adventurer-neutral', 'pixel-art', 'lorelei', 'micah'],
				female: ['adventurer', 'adventurer-neutral', 'pixel-art', 'lorelei', 'micah']
			};
			
			const gender = user.gender;
			const styleArray = gender === 'male' ? styles.male : styles.female;
			
			if (!styleArray.includes(avatarStyle)) {
				return res.status(400).json({ error: 'Invalid avatar style' });
			}
			
			const seed = user.username.toLowerCase().replace(/[^a-z0-9]/g, '');
			const backgroundColor = gender === 'male' ? '8b4513' : '7c3030';
			updateData.profilePic = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${seed}&backgroundColor=${backgroundColor}`;
		}
		
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: updateData,
		});
		
		res.status(200).json({
			id: updatedUser.id,
			fullName: updatedUser.fullName,
			username: updatedUser.username,
			profilePic: updatedUser.profilePic,
		});
	} catch (error: unknown) {
		console.log(
			'Error in updateProfile controller',
			error instanceof Error ? error.message : 'Unknown error',
		);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

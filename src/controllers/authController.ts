// src/controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateSalt = async () => await bcrypt.genSalt();

const generatePassword = async (password: string, salt: string) => await bcrypt.hash(password, salt);

const validatePassword = async (enterPassword: string, hash: string, salt: string) => {
  return (await generatePassword(enterPassword, salt)) === hash;
};

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, phone, password } = req.body;

  try {
    const salt = await generateSalt();
    const hash = await generatePassword(password, salt);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'The user already exists' });
    }

    const user = new User({ firstname, lastname, email, phone, hash, salt });
    await user.save();

    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.status(201).json({ message: 'User created', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const passwordValid = await validatePassword(password, user.hash, user.salt);
    if (!passwordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-hash -salt');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

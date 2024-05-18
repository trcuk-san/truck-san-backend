import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateSalt = async () => {
  return await bcrypt.genSalt();
};

const generatePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

const validatePassword = async (enteredPassword: string, hash: string, salt: string) => {
  return (await generatePassword(enteredPassword, salt)) === hash;
};

export const register = async (req: Request, res: Response) => {
  console.log('register work!');
  const { firstname, lastname, phone, email, password } = req.body;

  try {
    const salt = await generateSalt();
    const hash = await generatePassword(password, salt);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errors: [
          {
            msg: 'The user already exists',
            param: 'email',
          },
        ],
      });
    }

    const user = await User.create({
      firstname,
      lastname,
      phone,
      email,
      hash,
      salt,
      profile_picture: 'http://res.cloudinary.com/di71vwint/image/upload/v1674291349/images/nsopymczagslnr78yyv5.png',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const tokenData = { uid: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' });

    console.log('Generated token:', token); // เพิ่ม log เพื่อตรวจสอบ token
    res.status(201).json({ message: 'User created', token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log('login work');
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Not Found Email',
            param: 'email',
          },
        ],
      });
    }

    const passwordValid = await validatePassword(password, user.hash, user.salt);
    if (!passwordValid) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Wrong Password',
            param: 'password',
          },
        ],
      });
    }

    const tokenData = { uid: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' });
    console.log('Generated token:', token); // เพิ่ม log เพื่อตรวจสอบ token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log('Received userId:', userId); // Log userId ที่ได้รับ
  try {
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await User.findById(userId).select('-hash -salt');
    // console.log('Fetched user from DB:', user); // Log ข้อมูลผู้ใช้ที่ถูกค้นหา
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { first_name } = req.body;
  try {
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await User.findByIdAndUpdate(userId, { firstname: first_name }, { new: true }).select('-hash -salt');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const listUsers = async (req: Request, res: Response) => {
    console.log('listUsers work!');
  try {
    const users = await User.find().select('-hash -salt');
    res.status(200).json({ message: 'success', data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

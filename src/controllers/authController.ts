import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const genrateSalt = async () => {
  return await bcrypt.genSalt();
};

const generatePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

const validatePassword = async (enterPassword: string, hash: string, salt: string) => {
  return (await generatePassword(enterPassword, salt)) === hash;
};

export const register = async (req: Request, res: Response) => {
  console.log('createUser work!');
  const body = req.body;

  try {
      const salt = await genrateSalt();
      const hash = await generatePassword(body.password, salt);

      body.hash = hash;
      body.salt = salt;

      const existingUser = await User.findOne({ email: body.email });
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

      const user = await User.create(body);
      const tokenData = { uid: user._id };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' });

      res.status(201).json({ message: 'created', token: token });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log('signin con');
  const body = req.body;
  try {
      const user = await User.findOne({ email: body.email });

      if (user) {
          const passwordValid = await validatePassword(body.password, user.hash, user.salt);

          if (passwordValid) {
              const tokenData = { uid: user._id };
              const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' });
              res.status(200).json({ message: 'success', token: token });
          } else {
              res.status(400).json({
                  errors: [
                      {
                          msg: 'Wrong Password',
                          param: 'password',
                      },
                  ],
              });
          }
      } else {
          res.status(400).json({
              errors: [
                  {
                      msg: 'Not Found Email',
                      param: 'email',
                  },
              ],
          });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
  }
};

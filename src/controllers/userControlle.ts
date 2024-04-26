import { Request, Response } from 'express';
import User from '../models/user';

export const createUser = async (req: Request, res: Response) => {
  console.log("createUser works");

  const body = req.body;
  try {
    await User.create({
      firstname: req.body.firstname,
      username: req.body.username,
    })
    res.status(201).json({
      message: 'createdOrder',
  });
  } catch (error) {
    console.log(error);
      res.status(500);
  }
};
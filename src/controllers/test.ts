import { Request, Response } from 'express';

export const getTest = async (req: Request, res: Response) => {
  
  console.log("hello");

  res.status(200).json({
      message: 'success',
  });
};

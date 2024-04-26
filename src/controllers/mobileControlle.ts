import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import Order from '../models/order';


export const MyOrder = async (req: Request, res: Response) => {
  console.log("MyOrder");
  const query = req.query;
  console.log('getMytoilet: ', query.driver);
};


// อาจจะใช้ routes getOrder
export const MyOrderDetail = async (req: Request, res: Response) => {
  console.log("MyOrderDetail");

};


export const UpdateMyOrderStatus = async (req: Request, res: Response) => {
  console.log("UpdateMyOrderStatus");
};

export const MyProfile = async (req: Request, res: Response) => {
  console.log("UpdateMyOrderStatus");
  // const userData = await User.findById(req.body._id);
  // const order
  //   res.status(200).json({
  //       message: 'success',
  //       data: data,
  //   });
};
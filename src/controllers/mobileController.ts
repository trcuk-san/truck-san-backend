import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import Order from '../models/order';

export const UpdateOrderStatus = async (req: Request, res: Response) => {
  console.log("UpdateMyOrderStatus");
  try {
    await Order.findByIdAndUpdate(req.body._id, {
      orderStatus: String,
    })
        .then((data) => {
            console.log(data);
            res.status(200).json({ data: data });
        })
        .catch((err) => {
            console.log('error', err);
            res.status(500).json({ message: 'server error' });
        });
  } catch (error) {
  console.log('error', error);
}
};

export const UpdateOrderFee = async (req: Request, res: Response) => {
  console.log("UpdateMyOrderStatus");
  try {
    await Order.findByIdAndUpdate(req.body._id, {
      oilFee: req.body.oilFee,
      tollwayFee: req.body.tollwayFee,
      otherFee: req.body.otherFee,
    })
        .then((data) => {
            console.log(data);
            res.status(200).json({ data: data });
        })
        .catch((err) => {
            console.log('error', err);
            res.status(500).json({ message: 'server error' });
        });
} catch (error) {
    console.log('error', error);
}
};
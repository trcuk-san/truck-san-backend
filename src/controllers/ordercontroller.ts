import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../models/order';
export const createOrder = async (req: Request, res: Response) => {
    console.log('createOrder work!');
    const body = req.body;
    try {
        await Order.create({
          date: req.body.date,
          time: req.body.time,
          vehicle: req.body.vehicle,
          driver: req.body.driver,
          pick_up: req.body.pick_up,
          drop_off: req.body.drop_off,
          consumer: req.body.consumer,
          remark: req.body.remark,
        });
        res.status(201).json({
            message: 'createdOrder',
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};

export const listOrder = async (req: Request, res: Response) => {
    console.log('getAllOrder work!');

    const data = await Order.find();
    res.status(200).json({
        message: 'success',
        data: data,
    });
};

export const updateOrder = async (req: Request, res: Response) => {
    console.log('updateOrder work!');

    try {
        await Order.findByIdAndUpdate(req.body._id, {
            date: req.body.date,
            time: req.body.time,
            vehicle: req.body.vehicle,
            driver: req.body.driver,
            pick_up: req.body.pick_up,
            drop_off: req.body.drop_off,
            consumer: req.body.consumer,
            remark: req.body.remark,
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

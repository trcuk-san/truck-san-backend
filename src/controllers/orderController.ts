import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../models/order';

export const createOrder = async (req: Request, res: Response) => {
    console.log('createOrder work!');

    const body = req.body;
    try {
        await Order.create({
            datePickUp: req.body.datePickUp,
            timePickUp: req.body.timePickUp,
            dateDropOff: req.body.dateDropOff,
            timeDropOff: req.body.timeDropOff,
            vehicle: req.body.vehicle,
            driver: req.body.driver,
            pick_up: req.body.pick_up,
            drop_off: req.body.drop_off,
            consumer: req.body.consumer,
            income: req.body.income,
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

export const getOrder = async (req: Request, res: Response) => {
    console.log('getOneOrder work!');

    const data = await Order.findById(req.body._id);
    res.status(200).json({
        message: 'success',
        data: data,
    });
};

export const updateOrder = async (req: Request, res: Response) => {
    console.log('updateOrder work!');

    try {
        await Order.findByIdAndUpdate(req.body._id, {
            datePickUp: req.body.datePickUp,
            timePickUp: req.body.timePickUp,
            dateDropOff: req.body.dateDropOff,
            timeDropOff: req.body.timeDropOff,
            vehicle: req.body.vehicle,
            driver: req.body.driver,
            pick_up: req.body.pick_up,
            drop_off: req.body.drop_off,
            consumer: req.body.consumer,
            income: req.body.income,
            oilFee: req.body.oilFee,
            tollwayFee: req.body.tollwayFee,
            otherFee: req.body.otherFee,
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

export const deleteOrder = async (req: Request, res: Response) => {
    console.log("deleteOrder work");
    
    console.log(req.body._id);
    try {
        const order = await Order.findById(req.body._id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        await order.deleteOne();
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMyTask = async (req: Request, res: Response) => {
    console.log('getMyTask work!');
    const query = req.query;
    console.log('getMyTask: ', query.driver);
    const regexQuery = query.driver;
    console.log(regexQuery);
    try {
        if (query.driver !== '') {
            const regexQuery = query.driver;
            if (regexQuery) {
                console.log(regexQuery);
                const dataMyOrder: any = await Order.aggregate([
                    { $match: { driver: new mongoose.Types.ObjectId(regexQuery.toString()), orderStatus: { $ne: "Finished" } } },
                    { $sort: { createdAt: -1 } },
                ]);
                if (dataMyOrder.length > 0) {
                    res.status(200).json({
                        message: 'success',
                        MyOrder: dataMyOrder,
                    });
                    console.log(dataMyOrder);
                } else {
                    console.log('No data');
                    res.status(400).json({ message: 'No results found' });
                }
            } else {
                console.log('regexQuery is undefined');
                res.status(400).json({ message: 'Invalid query' });
            }
        } else {
            console.log('No search');
            res.status(400).json({ message: 'Please enter place name' });
        }
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};
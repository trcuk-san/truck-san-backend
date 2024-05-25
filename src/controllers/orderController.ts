import { Request, Response } from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import Order from '../models/order';

const GOOGLE_MAPS_API_KEY = 'AIzaSyD01Tc1PUR7gyHVmP46JA6JjBerk2-kAPM'; 

const getMonthNumber = (monthName: string) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames.indexOf(monthName) + 1;
};

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
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};

export const listOrder = async (req: Request, res: Response) => {
    console.log('listOrder work!');

    try {
        const data = await Order.find();
        console.log("Fetched Orders: ", data); // Add this log
        res.status(200).json({
            message: 'success',
            data: data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};

export const getOrder = async (req: Request, res: Response) => {
    console.log('getOneOrder work!');
    const { _id } = req.params;  // Ensure you're getting the _id from params, not body

    try {
        const data = await Order.findById(_id);  // Use _id from params
        res.status(200).json({
            message: 'success',
            data: data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    console.log('updateOrder work!');

    try {
        const order = await Order.findByIdAndUpdate(req.params._id, {
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
            orderStatus: req.body.orderStatus,
            invoiced: req.body.invoiced,
        }, { new: true });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    console.log("deleteOrder work");

    try {
        const order = await Order.findById(req.params._id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        await order.deleteOne();
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};

export const getDistanceMatrix = async (req: Request, res: Response) => {
    const { origins, destinations } = req.query;

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
            params: {
                origins,
                destinations,
                key: GOOGLE_MAPS_API_KEY,
            },
        });

        if (!response.data || !response.data.rows) {
            return res.status(500).json({ error: 'Invalid distance matrix response structure' });
        }

        res.json(response.data);
    } catch (error: unknown) {
        const errorMsg = (error as any).response?.data?.error_message || (error as any).message;
        console.error('Error fetching distance matrix:', errorMsg);
        res.status(500).json({ error: errorMsg });
    }
};

export const listOrderByDriver = async (req: Request, res: Response) => {
    console.log('listOrderByDriver work!');
    const { driverId } = req.params;

    try {
        const orders = await Order.find({ driver: driverId });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this driver' });
        }

        res.status(200).json({ data: orders });
    } catch (error) {
        console.log('Error fetching orders:', error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};

export const listFinishedOrders = async (req: Request, res: Response) => {
    console.log('listFinishedOrders work!');
    try {
      const year = parseInt(req.query.year as string);
      const month = getMonthNumber(req.query.month as string) - 1; // Correct month parsing
  
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
  
      const orders = await Order.find({
        orderStatus: 'Finished',
        createdAt: { $gte: startDate, $lte: endDate }
      });
  
      res.status(200).json({
        message: 'success',
        data: orders,
      });
    } catch (error) {
      console.error("Error fetching finished orders:", (error as Error).message);
      res.status(500).json({
        message: 'Error fetching finished orders',
        error: (error as Error).message,
      });
    }
  };
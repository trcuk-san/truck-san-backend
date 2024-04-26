import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Customer from '../models/customer';

export const createCustomer = async (req: Request, res: Response) => {
    console.log('createCustomer work!');
    const body = req.body;
    try {
        await Customer.create({
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
        });
        res.status(201).json({
            message: 'createdCustomer',
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};

export const listCustomer = async (req: Request, res: Response) => {
    console.log('getAllCustomer work!');

    const data = await Customer.find();
    res.status(200).json({
        message: 'success',
        data: data,
    });
};

export const getCustomer = async (req: Request, res: Response) => {
    console.log('getOneCustomer work!');

    const data = await Customer.findById(req.body._id);
    res.status(200).json({
        message: 'success',
        data: data,
    });
};

export const updateCustomer = async (req: Request, res: Response) => {
    console.log('updateCustomer work!');

    try {
        await Customer.findByIdAndUpdate(req.body._id, {
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
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

export const deleteCustomer = async (req: Request, res: Response) => {
    console.log("deleteCustomer work");
    console.log(req.body._id);
    try {
        const customer = await Customer.findById(req.body._id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        await customer.deleteOne();
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
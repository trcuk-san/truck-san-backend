import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Invoice from '../models/invoice';

export const createInvoice = async (req: Request, res: Response) => {
    console.log('createInvoice work!');
    const body = req.body;
    try {
        await Invoice.create({
          // name: req.body.name,
          // address: req.body.address,
          // phone: req.body.phone,
        });
        res.status(201).json({
            message: 'createdInvoice',
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};

export const listInvoice = async (req: Request, res: Response) => {
    console.log('getAllInvoice work!');

    const data = await Invoice.find();
    res.status(200).json({
        message: 'success',
        data: data,
    });
};

export const getInvoice = async (req: Request, res: Response) => {
    console.log('getOneInvoice work!');

    const data = await Invoice.findById(req.body._id);
    res.status(200).json({
        message: 'success',
        data: data,
    });
};

export const updateInvoice = async (req: Request, res: Response) => {
    console.log('updateInvoice work!');

    try {
        await Invoice.findByIdAndUpdate(req.body._id, {
          // name: req.body.name,
          // address: req.body.address,
          // phone: req.body.phone,
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

export const deleteInvoice = async (req: Request, res: Response) => {
    console.log("deleteInvoice work");
    console.log(req.body._id);
    try {
        const invoice = await Invoice.findById(req.body._id);
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        await invoice.deleteOne();
        res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
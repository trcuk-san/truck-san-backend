import { Request, Response } from 'express';
import Invoice from '../models/invoice';
import Order from '../models/order';

export const createInvoice = async (req: Request, res: Response) => {
    console.log('createInvoice work!');
    const body = req.body;
    try {
        const orders = await Order.find({ '_id': { $in: req.body.listorderId } });
        const totalIncome = orders.reduce((total, order) => total + order.income, 0);
        await Invoice.create({
            customer: req.body.customer,
            address: req.body.address,
            listorderId: req.body.listorderId,
            amount: totalIncome,
        });
        res.status(201).json({
            message: 'createdInvoice',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const listInvoice = async (req: Request, res: Response) => {
    console.log('listInvoice work!');
    try {
        const data = await Invoice.find();
        res.status(200).json({
            message: 'success',
            data: data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getInvoice = async (req: Request, res: Response) => {
    console.log('getInvoice work!');
    console.log('Request ID:', req.params.id); // Log the ID received

    try {
        const data = await Invoice.findById(req.params.id);
        if (!data) {
            console.log('Invoice not found');
            return res.status(404).json({ message: 'Invoice not found' });
        }
        console.log('Invoice data:', data); // Log the data found
        res.status(200).json({
            message: 'success',
            data: data,
        });
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateInvoice = async (req: Request, res: Response) => {
    console.log('updateInvoice work!');
    try {
        const data = await Invoice.findByIdAndUpdate(req.body._id, {
            customer: req.body.customer,
            address: req.body.address,
            listorderId: req.body.listorderId,
            amount: req.body.amount,
            invoicestatus: req.body.invoicestatus
        }, { new: true });
        
        if (!data) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.status(200).json({ data: data });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteInvoice = async (req: Request, res: Response) => {
    console.log("deleteInvoice work");
    try {
        const invoice = await Invoice.findById(req.params.id);
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



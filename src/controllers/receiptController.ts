// receiptController.ts
import { Request, Response } from 'express';
import Receipt from '../models/receipt';
import Invoice from '../models/invoice';

export const createReceipt = async (req: Request, res: Response) => {
    console.log('createInvoice work!');
    const { customer, address, listinvoice, amount } = req.body;
    try {
      const invoices = await Invoice.find({ '_id': { $in: listinvoice } });
      const totalIncome = invoices.reduce((total, invoice) => total + invoice.amount, 0);
      const newReceipt = await Receipt.create({
        customer,
        address,
        listinvoice,
        amount: totalIncome,
      });
  
      // Update invoicestatus of selected invoices to true
      await Invoice.updateMany(
        { '_id': { $in: listinvoice } },
        { $set: { invoicestatus: true } }
      );
  
      res.status(201).json({
        message: 'createdInvoice',
        data: newReceipt,
      });
    } catch (error) {
      console.error('Error creating receipt:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export const listReceipt = async (req: Request, res: Response) => {
    console.log('getAllReceipts work!');
    try {
        const data = await Receipt.find();
        console.log('Receipts Data:', data);
        res.status(200).json({
            message: 'success',
            data: data,
        });
    } catch (error) {
        console.error("Error fetching receipts:", (error as Error).message);
        res.status(500).json({
            message: 'Error fetching receipts',
            error: (error as Error).message,
        });
    }
};

export const getReceipt = async (req: Request, res: Response) => {
    console.log('getOneReceipt work!');
    try {
        const data = await Receipt.findById(req.params.id); // Use req.params.id to get the ID from the URL params
        if (!data) {
            return res.status(404).json({ message: "Receipt not found" });
        }
        res.status(200).json({
            message: 'success',
            data: data,
        });
    } catch (error) {
        console.error("Error fetching receipt:", (error as Error).message);
        res.status(500).json({
            message: 'Error fetching receipt',
            error: (error as Error).message,
        });
    }
};

export const updateReceipt = async (req: Request, res: Response) => {
    console.log('updateReceipt work!');
    try {
        const data = await Receipt.findByIdAndUpdate(req.body._id, {
            // Update fields here
        });
        if (!data) {
            return res.status(404).json({ message: "Receipt not found" });
        }
        res.status(200).json({
            message: 'Receipt updated successfully',
            data: data,
        });
    } catch (error) {
        console.error("Error updating receipt:", (error as Error).message);
        res.status(500).json({
            message: 'Error updating receipt',
            error: (error as Error).message,
        });
    }
};

export const deleteReceipt = async (req: Request, res: Response) => {
    console.log("deleteReceipt work");
    try {
        const receipt = await Receipt.findById(req.body._id);
        if (!receipt) {
            return res.status(404).json({ message: "Receipt not found" });
        }
        await receipt.deleteOne();
        res.status(200).json({ message: "Receipt deleted successfully" });
    } catch (error) {
        console.error("Error deleting receipt:", (error as Error).message);
        res.status(500).json({
            message: "Error deleting receipt",
            error: (error as Error).message,
        });
    }
};

export const getInvoice = async (req: Request, res: Response) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.status(200).json({ message: 'success', data: invoice });
    } catch (error) {
        console.error('Error fetching invoice:', (error as Error).message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

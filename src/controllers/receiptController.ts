// receiptController.ts
import { Request, Response } from 'express';
import Receipt from '../models/receipt';
import Invoice from '../models/invoice';

const monthNameToNumber = (month: string): number | null => {
    const months: { [key: string]: number } = {
      january: 1,
      february: 2,
      march: 3,
      april: 4,
      may: 5,
      june: 6,
      july: 7,
      august: 8,
      september: 9,
      october: 10,
      november: 11,
      december: 12,
    };
    return months[month.toLowerCase()] || null;
  };

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

export const listReceipts = async (req: Request, res: Response) => {
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

export const listReceiptsByYearMonth = async (req: Request, res: Response) => {
    console.log('listReceiptsByYearMonth work!');
    const { year, month } = req.query;
    try {
      const yearNum = parseInt(year as string, 10);
      const monthNum = monthNameToNumber(month as string);
  
      if (isNaN(yearNum) || monthNum === null) {
        return res.status(400).json({ message: 'Invalid year or month' });
      }
  
      const startDate = new Date(Date.UTC(yearNum, monthNum - 1, 1)); // First day of the month
      const endDate = new Date(Date.UTC(yearNum, monthNum, 0, 23, 59, 59)); // Last day of the month
  
      const data = await Receipt.find({
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        }
      }).sort({ createdAt: 1 });
  
      console.log('Filtered Receipts Data:', data);
      res.status(200).json({
        message: 'success',
        data: data,
      });
    } catch (error) {
      console.error("Error fetching receipts by year and month:", (error as Error).message);
      res.status(500).json({
        message: 'Error fetching receipts by year and month',
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
    const { id } = req.params; // Use 'id' instead of '_id'
    const { customer, address } = req.body; // Only updating customer and address

    try {
        const data = await Receipt.findByIdAndUpdate(id, { customer, address }, { new: true });
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
    console.log("deleteReceipt work!");
    try {
      const { id } = req.params;
      const receipt = await Receipt.findById(id);
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

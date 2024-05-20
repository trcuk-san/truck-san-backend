import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Voucher from '../models/voucher';
import Order from '../models/order';

export const createVoucher = async (req: Request, res: Response) => {
  console.log('createVoucher working!');
    const body = req.body;

    try {
        // Parse the month and year from the request body
        const startDate = new Date(body.year, body.month - 1, 1);
        const endDate = new Date(body.year, body.month, 0);

        // Adjust endDate to be the last moment of the day
        endDate.setHours(23, 59, 59, 999);

        // Fetch orders within the specified month and year
        const orders = await Order.find({
            datePickUp: {
              $gte: startDate.toISOString().split('T')[0],
              $lte: endDate.toISOString().split('T')[0] 
            }
        });

        // Group orders by datePickUp and calculate totals
        const vouchersMap: Record<string, { date: string, income: number, oilFee: number, tollwayFee: number, otherFee: number }> = {};

        orders.forEach(order => {
            const dateStr: string = order.datePickUp.valueOf(); // Ensure date is a primitive string
            if (!vouchersMap[dateStr]) {
                vouchersMap[dateStr] = {
                    date: dateStr,
                    income: 0,
                    oilFee: 0,
                    tollwayFee: 0,
                    otherFee: 0
                };
            }

            vouchersMap[dateStr].income += order.income;
            vouchersMap[dateStr].oilFee += order.oilFee;
            vouchersMap[dateStr].tollwayFee += order.tollwayFee;
            vouchersMap[dateStr].otherFee += order.otherFee;
        });

        // Create vouchers for each date
        const vouchers = Object.values(vouchersMap).map(voucherData => ({
            date: new Date(voucherData.date), // Convert string to Date
            income: voucherData.income,
            oilFee: voucherData.oilFee,
            tollwayFee: voucherData.tollwayFee,
            otherFee: voucherData.otherFee
        }));

        // Insert the vouchers into the database
        await Voucher.insertMany(vouchers);

        res.status(201).json({
            message: 'Vouchers created successfully',
            vouchers
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
};

export const listVoucher = async (req: Request, res: Response) => {
    console.log('getAllInvoice work!');

    const data = await Voucher.find();
    res.status(200).json({
        message: 'success',
        data: data,
    });
};

// export const getVoucher = async (req: Request, res: Response) => {
//     console.log('getOneInvoice work!');

//     const data = await Receipt.findById(req.body._id);
//     res.status(200).json({
//         message: 'success',
//         data: data,
//     });
// };

// export const updateVoucher = async (req: Request, res: Response) => {
//     console.log('updateInvoice work!');

//     try {
//         await Receipt.findByIdAndUpdate(req.body._id, {
//           // name: req.body.name,
//           // address: req.body.address,
//           // phone: req.body.phone,
//         })
//             .then((data) => {
//                 console.log(data);
//                 res.status(200).json({ data: data });
//             })
//             .catch((err) => {
//                 console.log('error', err);
//                 res.status(500).json({ message: 'server error' });
//             });
//     } catch (error) {
//         console.log('error', error);
//     }
// };

// export const deleteVoucher = async (req: Request, res: Response) => {
//     console.log("deleteInvoice work");
//     console.log(req.body._id);
//     try {
//         const invoice = await Receipt.findById(req.body._id);
//         if (!invoice) {
//             return res.status(404).json({ message: "Invoice not found" });
//         }
//         await invoice.deleteOne();
//         res.status(200).json({ message: "Invoice deleted successfully" });
//     } catch (error) {
//         console.log('error', error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };
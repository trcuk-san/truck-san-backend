import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import Order from '../models/order';

export const MyTask = async (req: Request, res: Response) => {
  console.log('MyTask work!');
  const query = req.query;
  console.log('MyTask: ', query.driver);
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
          { $lookup: { from: 'vehicles', localField: 'vehicle', foreignField: '_id', as: 'vehicleData' } }, // Populate vehicle field
          { $unwind: { path: '$vehicleData', preserveNullAndEmptyArrays: true } }, // Unwind the populated vehicleData array
          { $project: { 
              _id: 1, 
              datePickUp: 1,
              timePickUp: 1,
              dateDropOff: 1,
              timeDropOff: 1,
              vehicleID: '$vehicleData.vehicleId', // Rename the vehicle field to vehicleID
              driver: 1,
              pick_up: 1,
              drop_off: 1,
              consumer: 1,
              income: 1,
              oilFee: 1,
              tollwayFee: 1,
              otherFee: 1,
              remark: 1,
              orderStatus: 1,
          } },
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
      res.status(400).json({ message: 'Please enter diver' });
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

export const MyFinishTask = async (req: Request, res: Response) => {
  console.log('MyFinishTask work!');
  const query = req.query;
  console.log('MyFinishTask: ', query.driver);
  const regexQuery = query.driver;
  console.log(regexQuery);

  // คำนวณวันที่เริ่มต้นและสิ้นสุดของเดือนปัจจุบัน
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();
  console.log(startOfMonth, endOfMonth);

  try {
    if (query.driver !== '') {
      const regexQuery = query.driver;
      if (regexQuery) {
        console.log(regexQuery);
        const dataMyOrder: any = await Order.aggregate([
          {
            $match: {
              driver: new mongoose.Types.ObjectId(regexQuery.toString()),
              orderStatus: "Finished",
              datePickUp: { $gte: startOfMonth, $lte: endOfMonth }
            }
          },
          { $sort: { datePickUp: -1 } },
          {
            $lookup: {
              from: 'vehicles',
              localField: 'vehicle',
              foreignField: '_id',
              as: 'vehicleData'
            }
          },
          {
            $unwind: {
              path: '$vehicleData',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $addFields: {
              incomePercentage: { $multiply: ["$income", 0.1] }
            }
          },
          {
            $group: {
              _id: null,
              totalIncomePercentage: { $sum: "$incomePercentage" },
              MyOrder: { $push: "$$ROOT" }
            }
          },
          {
            $project: {
              _id: 0,
              totalIncomePercentage: 1,
              MyOrder: 1
            }
          }
        ]);
        
        if (dataMyOrder.length > 0 && dataMyOrder[0].MyOrder.length > 0) {
          res.status(200).json({
            message: 'success',
            MyOrder: dataMyOrder[0].MyOrder,
            salary: dataMyOrder[0].totalIncomePercentage
          });
          console.log(dataMyOrder[0].MyOrder);
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
      res.status(400).json({ message: 'Please enter driver' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const statusOrder = [
    'Pending', // ยังไม่เริ่ม
    'Picked Up', // รับของจากต้นทางแล้ว
    'In Transit', // กำลังจัดส่ง
    'Delivered', // จัดส่งเสร็จแล้ว
];
export const UpdateOrderStatus = async (req: Request, res: Response) => {
    console.log("UpdateMyOrderStatus");
    try {
      const orderId = req.body._id;
      
      if (!orderId) {
        return res.status(400).json({ message: 'Order ID is required' });
      }
  
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      if (order.orderStatus === 'Cancelled') {
        return res.status(400).json({ message: 'Cannot update a cancelled order' });
      }
  
      // หา index ของสถานะปัจจุบัน
      const currentStatusIndex = statusOrder.indexOf(order.orderStatus);
  
      if (currentStatusIndex === -1) {
        return res.status(400).json({ message: 'Invalid order status' });
      }
  
      // หา index ของสถานะถัดไป
      const nextStatusIndex = (currentStatusIndex + 1) % statusOrder.length;
      const nextStatus = statusOrder[nextStatusIndex];
  
      // อัปเดตสถานะของคำสั่งซื้อ
      order.orderStatus = nextStatus;
      const updatedOrder = await order.save();
  
      console.log(updatedOrder);
      res.status(200).json({ data: updatedOrder });
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'server error' });
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
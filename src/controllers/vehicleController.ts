// controllers/vehicleController.ts
import { Request, Response } from 'express';
import Vehicle from '../models/vehicle';
import Order from '../models/order';

export const createVehicle = async (req: Request, res: Response) => {
  console.log("createdVehicle work");
  try {
    await Vehicle.create({
      vehicleId: req.body.vehicleId,
      vehicleStatus: req.body.vehicleStatus,
      remarks: req.body.remarks
    });
    res.status(200).json({ message: 'createdVehicle' });
  } catch (error) {
    res.status(500).json({ message: "Cannot create vehicle" });
  }
};

export const listVehicle = async (req: Request, res: Response) => {
  console.log('listVehicle work!');
  const data = await Vehicle.find();
  res.status(200).json({ message: 'success', data });
};

export const getVehicle = async (req: Request, res: Response) => {
  console.log('getOneVehicle work!');
  const data = await Vehicle.findById(req.query._id);
  res.status(200).json({ message: 'success', data });
};

export const updateVehicle = async (req: Request, res: Response) => {
  console.log('updateVehicle work!');
  try {
    await Vehicle.findByIdAndUpdate(req.body._id, {
      vehicleId: req.body.vehicleId,
      vehicleStatus: req.body.vehicleStatus,
      remarks: req.body.remarks,
    }).then((data) => {
      console.log(data);
      res.status(200).json({ message: 'success', data });
    })
  } catch (error) {
    console.log('error', error);
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  console.log("deleteVehicle work");
  try {
    const vehicle = await Vehicle.findById(req.params._id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    await vehicle.deleteOne();
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// New function to get vehicle details along with orders
export const getVehicleOrders = async (req: Request, res: Response) => {
  console.log('getVehicleOrders work!');
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    const orders = await Order.find({ vehicle: req.params.id });
    res.status(200).json({ vehicle, orders });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

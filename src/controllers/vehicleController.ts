import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Vehicle from '../models/vehicle';

export const createVehicle = async (req: Request, res: Response) => {
  console.log("createdVehicle work");
  const body = req.body;
  try {
    await Vehicle.create({
      vehicleId: req.body.vehicleId,
      vehicleStatus: req.body.vehicleStatus,
      remarks: req.body.remarks
    });
    res.status(200).json({message: 'createdVehicle',})
  } catch (error) {
    res.status(500).json({ message: "Cannot Created Vehicles" });
  }
};

export const listVehicle = async (req: Request, res: Response) => {
    console.log('listVehicle work!');

    const data = await Vehicle.find();
    res.status(200).json({
        message: 'success',
        data: data,
    });
};

export const getVehicle = async (req: Request, res: Response) => {
    console.log('getOneVehicle work!');

    const data = await Vehicle.findById(req.body._id);
    res.status(200).json({
        message: 'success',
        data: data,
    });
};

export const updateVehicle = async (req: Request, res: Response) => {
    console.log('updateVehicle work!');

    try {
        await Vehicle.findByIdAndUpdate(req.body._id, {
            vehicleId: req.body.vehicleId,
            vehicleStatus: req.body.vehicleStatus,
            remarks: req.body.remarks,
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

export const deleteVehicle = async (req: Request, res: Response) => {
    console.log("deleteVehicle work");
    console.log(req.body._id);
    try {
        const vehicle = await Vehicle.findById(req.body._id);
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
// routes/vehicleRoutes.ts
import express from 'express';
import { 
  createVehicle,
  listVehicle,
  getVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleOrders
} from '../controllers/vehicleController';

const router = express.Router();
router.post('/createVehicle', createVehicle);
router.get('/listVehicle', listVehicle);
router.get('/getVehicle', getVehicle);
router.put('/updateVehicle', updateVehicle);
router.delete('/deleteVehicle/:_id', deleteVehicle);
router.get('/getVehicleOrders/:id', getVehicleOrders); // New route

export default router;

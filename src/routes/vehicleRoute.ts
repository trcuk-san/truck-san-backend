import express from 'express';
import { 
  createVehicle,
  listVehicle,
  getVehicle,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicleController';

const router = express.Router();
router.post('/createVehicle', createVehicle);
router.get('/listVehicle', listVehicle);
router.get('/getVehicle', getVehicle);
router.put('/updateVehicle', updateVehicle);
router.delete('/deleteVehicle', deleteVehicle);

export default router;
import express from 'express';
import { 
  createOrder,
  listOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getDistanceMatrix // เพิ่มบรรทัดนี้
} from '../controllers/orderController';

const router = express.Router();
router.post('/createOrder', createOrder);
router.get('/listOrder', listOrder);
router.get('/getOrder', getOrder);
router.put('/updateOrder', updateOrder);
router.delete('/deleteOrder/:_id', deleteOrder);
router.get('/distanceMatrix', getDistanceMatrix); // เพิ่มบรรทัดนี้

export default router;

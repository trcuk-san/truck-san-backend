import express from 'express';
import { 
  createOrder,
  listOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getDistanceMatrix,
  listOrderByDriver,
  listFinishedOrders
} from '../controllers/orderController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/createOrder', createOrder);
router.get('/listOrder', listOrder);
router.get('/getOrder/:_id', getOrder);  
router.put('/updateOrder/:_id', updateOrder); // Updated to include :_id
router.delete('/deleteOrder/:_id', deleteOrder);
router.get('/distanceMatrix', getDistanceMatrix);
router.get('/listOrderByDriver/:driverId', authMiddleware, listOrderByDriver);
router.get('/listFinishedOrders', listFinishedOrders);

export default router;

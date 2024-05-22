import express from 'express';
import { 
  MyTask,
  UpdateOrderFee,
  UpdateOrderStatus,
} from '../controllers/mobileController';

const router = express.Router();
router.get('/myTask', MyTask)
router.post('/updateOrderFee', UpdateOrderFee)
router.post('/updateOrderStatus', UpdateOrderStatus)

export default router;
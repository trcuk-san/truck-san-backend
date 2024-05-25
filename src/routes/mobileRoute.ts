import express from 'express';
import { 
  MyTask,
  UpdateOrderFee,
  UpdateOrderStatus,
  MyFinishTask
} from '../controllers/mobileController';

const router = express.Router();
router.get('/myTask', MyTask)
router.post('/updateOrderFee', UpdateOrderFee)
router.post('/updateOrderStatus', UpdateOrderStatus)
router.get('/MyFinishTask', MyFinishTask)

export default router;
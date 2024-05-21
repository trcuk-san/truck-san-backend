import express from 'express';
import { 
  createReceipt, 
  listReceipt, 
  getReceipt, 
  updateReceipt, 
  deleteReceipt 
} from '../controllers/receiptController';

const router = express.Router();
router.post('/createReceipt', createReceipt);
router.get('/listReceipt', listReceipt);
router.get('/getReceipt', getReceipt);
router.put('/updateReceipt', updateReceipt);
router.delete('/deleteReceipt', deleteReceipt);

export default router;
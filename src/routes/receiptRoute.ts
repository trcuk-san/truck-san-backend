import express from 'express';
import { 
  createReceipt, 
  listReceipt, 
  getReceipt, 
  updateReceipt, 
  deleteReceipt,
  getInvoice
} from '../controllers/receiptController';

const router = express.Router();
router.post('/createReceipt', createReceipt);
router.get('/listReceipt', listReceipt);
router.get('/getReceipt/:id', getReceipt);
router.put('/updateReceipt', updateReceipt);
router.delete('/deleteReceipt/:id', deleteReceipt); 
router.get('/getInvoice/:id', getInvoice);

export default router;

import express from 'express';
import { 
  createReceipt, 
  listReceipts, 
  listReceiptsByYearMonth,
  getReceipt, 
  updateReceipt, 
  deleteReceipt,
  getInvoice,
} from '../controllers/receiptController';


const router = express.Router();

router.post('/createReceipt', createReceipt);
router.get('/listReceipts', listReceipts);
router.get('/listReceiptsByYearMonth', listReceiptsByYearMonth); // New endpoint
router.get('/getReceipt/:id', getReceipt);
router.put('/updateReceipt/:id', updateReceipt);
router.delete('/deleteReceipt/:id', deleteReceipt); 
router.get('/getInvoice/:id', getInvoice);

export default router;

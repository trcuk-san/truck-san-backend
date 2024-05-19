import express from 'express';
import { 
  createInvoice,
  listInvoice,
  getInvoice,
  updateInvoice,
  deleteInvoice,
} from '../controllers/invoiceController';

const router = express.Router();
router.post('/createInvoice', createInvoice);
router.get('/listInvoice', listInvoice);
router.get('/getInvoice', getInvoice);
router.put('/updateInvoice', updateInvoice);
router.delete('/deleteInvoice', deleteInvoice);

export default router;
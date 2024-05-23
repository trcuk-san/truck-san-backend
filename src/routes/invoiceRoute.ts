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
router.put('/updateInvoice/:id', updateInvoice);
router.delete('/deleteInvoice/:id', deleteInvoice); // Updated to use params
router.get('/getInvoice/:id', getInvoice); // Updated to use params

export default router;

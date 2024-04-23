import express from 'express';
import { 
  createInvoice,
  listInvoice,
  getInvoice,
  updateInvoice,
  deleteInvoice,
} from '../controllers/invoiceControlle';

const router = express.Router();
router.post('/createCustomer', createInvoice);
router.get('/listCustomer', listInvoice);
router.get('/getCustomer', getInvoice);
router.put('/updateCustomer', updateInvoice);
router.delete('/deleteCustomer', deleteInvoice);

export default router;
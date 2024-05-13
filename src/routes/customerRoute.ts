import express from 'express';
import { 
  createCustomer,
  listCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer,
} from '../controllers/customerController';

const router = express.Router();
router.post('/createCustomer', createCustomer);
router.get('/listCustomer', listCustomer);
router.get('/getCustomer', getCustomer);
router.put('/updateCustomer', updateCustomer);
router.delete('/deleteCustomer', deleteCustomer);

export default router;
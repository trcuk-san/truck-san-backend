import express from 'express';
import { 
  MyOrder,
} from '../controllers/mobileController';

const router = express.Router();
router.get('/myOrder', MyOrder)

export default router;
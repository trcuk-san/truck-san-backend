import express from 'express';
import { 
  MyOrder,
} from '../controllers/mobileControlle';

const router = express.Router();
router.get('/myOrder', MyOrder)

export default router;
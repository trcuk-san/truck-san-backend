import express from 'express';
import { 
  createVoucher,
  listVoucher,
  
} from '../controllers/voucherController';

const router = express.Router();
router.post('/createVoucher', createVoucher);
router.get('/listVoucher', listVoucher);
// router.get('/getVoucher', getVoucher);
// router.put('/updateVoucher', updateVoucher);
// router.delete('/deleteVoucher', deleteVoucher);

export default router;
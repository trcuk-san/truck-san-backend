import express from 'express';
import { 
  createOrder, 
  listOrder, 
  updateOrder 
} from '../controllers/ordercontroller';
// import { authentication } from '../middleware/verifyHeader';
// import { toiletValidation, validate } from '../middleware/vaildator';

const router = express.Router();
router.get('/listOrder', listOrder);
// router.get('/mytoilet', getMytoilet);
router.put('/updateOrder', updateOrder);
// router.delete('/delete', deleteMyToilet);
// router.use(authentication);
router.post('/createOrder', createOrder);
// router.post('/createToilet', toiletValidation(), validate, createToilet);

export default router;
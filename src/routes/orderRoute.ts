import express from 'express';
import { 
  createOrder,
  listOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  listOrderUser,
} from '../controllers/orderController';
// import { authentication } from '../middleware/verifyHeader';
// import { toiletValidation, validate } from '../middleware/vaildator';

const router = express.Router();
router.post('/createOrder', createOrder);
router.get('/listOrder', listOrder);
router.get('/getOrder', getOrder);
router.put('/updateOrder', updateOrder);
router.delete('/deleteOrder', deleteOrder);
router.get('/listOrderUser', listOrderUser);

// router.use(authentication);

// router.post('/createToilet', toiletValidation(), validate, createToilet);

export default router;
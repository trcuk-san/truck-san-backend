import express from 'express';
const router = express.Router();
import { register, login, test } from '../controllers/authController';

router.post('/register', register);
router.post('/login', login);
router.get('/test', test);

export default router;

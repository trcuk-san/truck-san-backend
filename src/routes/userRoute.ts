import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';

router.post('/register', userController.registerUser);
// router.post('/login', userController.loginUser);

// Other user routes (e.g., update user)

export default router;

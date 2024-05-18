import express from 'express';
import { register, login, getProfile, updateProfile, listUsers } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile/:userId', authMiddleware, getProfile); // ใช้ middleware ที่นี่
router.put('/profile/:userId', authMiddleware, updateProfile); // เพิ่มการอัปเดตโปรไฟล์
router.get('/users', authMiddleware, listUsers); // Add this line to list all users

export default router;

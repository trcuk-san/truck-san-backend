import express from 'express';
import { createUser } from '../controllers/userControlle';

const router = express.Router();
router.get('/createUser', createUser)

export default router;
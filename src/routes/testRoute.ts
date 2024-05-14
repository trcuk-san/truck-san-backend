import express from 'express';
import { testAxion } from '../controllers/testControlls';

const router = express.Router();
router.get('/testAxion', testAxion);

export default router;
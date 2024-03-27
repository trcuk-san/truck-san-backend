import express from 'express';
import { getTest } from '../controllers/test';


const router = express.Router();

router.get('/hello', getTest);

export default router;
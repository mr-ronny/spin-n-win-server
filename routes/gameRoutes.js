import express from 'express';
import { spinWheel } from '../controllers/gameController.js';

const router = express.Router();

router.post('/spin', spinWheel);

export default router;

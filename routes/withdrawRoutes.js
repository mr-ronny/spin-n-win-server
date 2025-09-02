// server/routes/withdrawRoutes.js
import express from 'express';
import {
  requestWithdraw,
  getAllWithdraws,
  updateWithdrawStatus
} from '../controllers/withdrawController.js';

const router = express.Router();

router.post('/request', requestWithdraw);            // user requests
router.get('/all', getAllWithdraws);                 // admin dashboard
router.patch('/:id', updateWithdrawStatus);          // approve/reject

export default router;

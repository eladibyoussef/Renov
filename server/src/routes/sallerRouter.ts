import express from 'express';
import { registerSeller, loginSeller, updateSellerProfile, deleteSeller } from '../controllers/sallerController';

const router = express.Router();

router.post('/register', registerSeller);

router.post('/login', loginSeller);

router.put('/:sellerId/update', updateSellerProfile);

router.delete('/:sellerId/delete', deleteSeller);

export default router;

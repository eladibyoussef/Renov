import express from 'express';
import { createReview, updateReview, deleteReview, getReviews, getReviewsByRating, calculateAverageRating } from '../controllers/reviewController';

const router = express.Router();


router.get('/:id', getReviews);
router.post('/:id', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.get('/:rating/:id', getReviewsByRating);
router.get('/avrgRating/:id', calculateAverageRating);


export default router;

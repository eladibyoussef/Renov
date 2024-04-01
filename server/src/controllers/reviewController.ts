import { Request, Response } from 'express';
import Review, { ReviewDocument } from '../models/Review';
import Seller, { sellerDocument } from '../models/Seller';
import Professional, { ProfessionalDocument } from '../models/Professional';

// Create a new review
export const createReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { entityType, entityId, user, rating, comment } = req.body;
        let entityDocument: sellerDocument | ProfessionalDocument | null = null;

        // Determine the entity(seller or professional) type and find the corresponding document
        if (entityType === 'seller') {
            entityDocument = await Seller.findById(entityId);
        } else if (entityType === 'professional') {
            entityDocument = await Professional.findById(entityId);
        }

        if (!entityDocument) {
            res.status(404).json({ message: 'Entity not found' });
            return;
        } else if (entityDocument.reviews){


            
            // Create the review
            const newReview: ReviewDocument = new Review({
                entityType,
                entityId,
                user,
                rating,
                comment,
            });
            
            const savedReview = await newReview.save();
            entityDocument.reviews.push(savedReview._id);
            await entityDocument.save();
            
            res.status(201).json({ review: savedReview, entity: entityDocument });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a review by ID
export const updateReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const updatedReview = await Review.findByIdAndUpdate(id, { rating, comment }, { new: true });
        if (!updatedReview) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a review by ID
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all reviews
export const getReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get reviews by rating
export const getReviewsByRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const entityId = req.params.id;
        const rating = Number(req.params.rating);
        const entityType = req.params.entityType;

        let entityDocument: sellerDocument | ProfessionalDocument | null = null;

        // Determine the entity type and find the corresponding document
        if (entityType === 'seller') {
            entityDocument = await Seller.findById(entityId);
        } else if (entityType === 'professional') {
            entityDocument = await Professional.findById(entityId);
        }

        if (!entityDocument) {
            res.status(404).json({ message: 'Entity not found' });
            return;
        }

        const reviews: ReviewDocument[] = await Review.find({ entityId, rating });

        if (!reviews.length) {
            res.status(404).json({ message: 'No reviews found' });
            return;
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Calculate average rating
export const calculateAverageRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const entityId = req.params.id;
        const entityType = req.params.entityType;

        let entityDocument: sellerDocument | ProfessionalDocument | null = null;

        // Determine the entity type and find the corresponding document
        if (entityType === 'seller') {
            entityDocument = await Seller.findById(entityId);
        } else if (entityType === 'professional') {
            entityDocument = await Professional.findById(entityId);
        }

        if (!entityDocument) {
            res.status(404).json({ message: 'Entity not found' });
            return;
        }

        const reviews: ReviewDocument[] = await Review.find({ entityId });

        if (!reviews.length) {
            res.status(404).json({ message: 'No reviews found' });
            return;
        }

        let totalRatings = 0;
        for (const review of reviews) {
            totalRatings += review.rating;
        }

        const overallRating = totalRatings / reviews.length;
        res.status(200).json({ overallRating });
    } catch (error) {
        console.error('Error calculating overall rating:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

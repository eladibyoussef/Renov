"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAverageRating = exports.getReviewsByRating = exports.getReviews = exports.deleteReview = exports.updateReview = exports.createReview = void 0;
const Review_1 = __importDefault(require("../models/Review"));
const Seller_1 = __importDefault(require("../models/Seller"));
const Professional_1 = __importDefault(require("../models/Professional"));
// Create a new review
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { entityType, entityId, user, rating, comment } = req.body;
        let entityDocument = null;
        // Determine the entity(seller or professional) type and find the corresponding document
        if (entityType === 'seller') {
            entityDocument = yield Seller_1.default.findById(entityId);
        }
        else if (entityType === 'professional') {
            entityDocument = yield Professional_1.default.findById(entityId);
        }
        if (!entityDocument) {
            res.status(404).json({ message: 'Entity not found' });
            return;
        }
        else if (entityDocument.reviews) {
            // Create the review
            const newReview = new Review_1.default({
                entityType,
                entityId,
                user,
                rating,
                comment,
            });
            const savedReview = yield newReview.save();
            entityDocument.reviews.push(savedReview._id);
            yield entityDocument.save();
            res.status(201).json({ review: savedReview, entity: entityDocument });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createReview = createReview;
// Update a review by ID
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const updatedReview = yield Review_1.default.findByIdAndUpdate(id, { rating, comment }, { new: true });
        if (!updatedReview) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.status(200).json(updatedReview);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateReview = updateReview;
// Delete a review by ID
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedReview = yield Review_1.default.findByIdAndDelete(id);
        if (!deletedReview) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteReview = deleteReview;
// Get all reviews
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield Review_1.default.find();
        res.status(200).json(reviews);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getReviews = getReviews;
// Get reviews by rating
const getReviewsByRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entityId = req.params.id;
        const rating = Number(req.params.rating);
        const entityType = req.params.entityType;
        let entityDocument = null;
        // Determine the entity type and find the corresponding document
        if (entityType === 'seller') {
            entityDocument = yield Seller_1.default.findById(entityId);
        }
        else if (entityType === 'professional') {
            entityDocument = yield Professional_1.default.findById(entityId);
        }
        if (!entityDocument) {
            res.status(404).json({ message: 'Entity not found' });
            return;
        }
        const reviews = yield Review_1.default.find({ entityId, rating });
        if (!reviews.length) {
            res.status(404).json({ message: 'No reviews found' });
            return;
        }
        res.status(200).json(reviews);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getReviewsByRating = getReviewsByRating;
// Calculate average rating
const calculateAverageRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entityId = req.params.id;
        const entityType = req.params.entityType;
        let entityDocument = null;
        // Determine the entity type and find the corresponding document
        if (entityType === 'seller') {
            entityDocument = yield Seller_1.default.findById(entityId);
        }
        else if (entityType === 'professional') {
            entityDocument = yield Professional_1.default.findById(entityId);
        }
        if (!entityDocument) {
            res.status(404).json({ message: 'Entity not found' });
            return;
        }
        const reviews = yield Review_1.default.find({ entityId });
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
    }
    catch (error) {
        console.error('Error calculating overall rating:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.calculateAverageRating = calculateAverageRating;

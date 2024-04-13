"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController");
const router = express_1.default.Router();
router.get('/:id', reviewController_1.getReviews);
router.post('/:id', reviewController_1.createReview);
router.put('/:id', reviewController_1.updateReview);
router.delete('/:id', reviewController_1.deleteReview);
router.get('/:rating/:id', reviewController_1.getReviewsByRating);
router.get('/avrgRating/:id', reviewController_1.calculateAverageRating);
exports.default = router;

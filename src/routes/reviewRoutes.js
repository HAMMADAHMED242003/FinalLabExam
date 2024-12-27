const express = require('express');
const { createReview, updateReview, deleteReview, getReviews } = require('../controllers/reviewController');

const router = express.Router();

router.post('/', createReview);
router.get('/', getReviews);  // Fetch all reviews or filter by attractionId or visitorId
router.put('/:id', updateReview);  // Update review by ID
router.delete('/:id', deleteReview);  // Delete review by ID

module.exports = router;

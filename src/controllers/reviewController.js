const Review = require('../models/Review');
const Attraction = require('../models/Attraction');
const Visitor = require('../models/Visitor');

// Create a review
exports.createReview = async (req, res) => {
    try {
        const { attractionId, visitorId, score, comment } = req.body;

        // Check if the visitor has visited the attraction
        const visitor = await Visitor.findById(visitorId);
        if (!visitor || !visitor.visitedAttractions.includes(attractionId)) {
            return res.status(400).json({ error: 'Visitor has not visited the attraction' });
        }

        // Create the review
        const review = new Review({ attraction: attractionId, visitor: visitorId, score, comment });
        await review.save();

        // Update the attraction's rating
        const reviews = await Review.find({ attraction: attractionId });
        const averageRating = reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length;
        await Attraction.findByIdAndUpdate(attractionId, { rating: averageRating });

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const { score, comment } = req.body;

        // Find the review by ID
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Update the review fields
        review.score = score || review.score;
        review.comment = comment || review.comment;

        // Save the updated review
        await review.save();

        // Update the attraction's rating
        const attraction = await Attraction.findById(review.attraction);
        const reviews = await Review.find({ attraction: attraction._id });
        const averageRating = reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length;
        await Attraction.findByIdAndUpdate(attraction._id, { rating: averageRating });

        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;

        // Find and delete the review by ID
        const review = await Review.findByIdAndDelete(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Update the attraction's rating after deletion
        const attraction = await Attraction.findById(review.attraction);
        const reviews = await Review.find({ attraction: attraction._id });
        const averageRating = reviews.length ? reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length : 0;
        await Attraction.findByIdAndUpdate(attraction._id, { rating: averageRating });

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get all reviews or filter by attractionId or visitorId
exports.getReviews = async (req, res) => {
    try {
        const { attractionId, visitorId } = req.query;

        let filter = {};
        if (attractionId) filter.attraction = attractionId;
        if (visitorId) filter.visitor = visitorId;

        // Fetch reviews with optional filters
        const reviews = await Review.find(filter).populate('attraction').populate('visitor');

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

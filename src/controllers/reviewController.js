const Review = require('../models/Review');
const Attraction = require('../models/Attraction');
const Visitor = require('../models/Visitor');

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

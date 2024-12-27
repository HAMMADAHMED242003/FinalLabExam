const Visitor = require('../models/Visitor');
const Review = require('../models/Review');  // Add this import

// Create a new visitor
exports.createVisitor = async (req, res) => {
    try {
        const visitor = new Visitor(req.body);
        await visitor.save();
        res.status(201).json(visitor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all visitors
exports.getVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find();
        res.status(200).json(visitors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific visitor by ID
exports.getVisitorById = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) {
            return res.status(404).json({ error: 'Visitor not found' });
        }
        res.status(200).json(visitor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a visitor's information by ID
exports.updateVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!visitor) {
            return res.status(404).json({ error: 'Visitor not found' });
        }
        res.status(200).json(visitor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a visitor by ID
exports.deleteVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndDelete(req.params.id);
        if (!visitor) {
            return res.status(404).json({ error: 'Visitor not found' });
        }
        res.status(200).json({ message: 'Visitor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getVisitorActivity = async (req, res) => {
    try {
        // Get all visitors
        const visitors = await Visitor.find();

        // Map through each visitor to count the attractions they have reviewed
        const visitorsWithActivity = await Promise.all(visitors.map(async (visitor) => {
            // Find how many reviews this visitor has posted
            const reviewCount = await Review.countDocuments({ visitor: visitor._id });
            return {
                visitor: visitor,
                reviewCount: reviewCount
            };
        }));

        res.status(200).json(visitorsWithActivity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

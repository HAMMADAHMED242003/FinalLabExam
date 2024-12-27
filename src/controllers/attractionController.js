const Attraction = require('../models/Attraction');

// Create a new attraction (C)
exports.createAttraction = async (req, res) => {
    try {
        const attraction = new Attraction(req.body);
        await attraction.save();
        res.status(201).json(attraction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all attractions (R)
exports.getAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.status(200).json(attractions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get top-rated attractions (R)
exports.getTopRatedAttractions = async (req, res) => {
    try {
        const topRated = await Attraction.find().sort({ rating: -1 }).limit(5);
        res.status(200).json(topRated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific attraction by ID (R)
exports.getAttractionById = async (req, res) => {
    try {
        const attraction = await Attraction.findById(req.params.id);
        if (!attraction) {
            return res.status(404).json({ error: 'Attraction not found' });
        }
        res.status(200).json(attraction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an attraction (U)
exports.updateAttraction = async (req, res) => {
    try {
        const updatedAttraction = await Attraction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Return updated doc and validate
        );
        if (!updatedAttraction) {
            return res.status(404).json({ error: 'Attraction not found' });
        }
        res.status(200).json(updatedAttraction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an attraction (D)
exports.deleteAttraction = async (req, res) => {
    try {
        const deletedAttraction = await Attraction.findByIdAndDelete(req.params.id);
        if (!deletedAttraction) {
            return res.status(404).json({ error: 'Attraction not found' });
        }
        res.status(200).json({ message: 'Attraction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

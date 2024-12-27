const Attraction = require('../models/Attraction');
const Review = require('../models/Review');

exports.createAttraction = async (req, res) => {
    try {
        const attraction = new Attraction(req.body);
        await attraction.save();
        res.status(201).json(attraction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.status(200).json(attractions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTopRatedAttractions = async (req, res) => {
    try {
        const topRated = await Attraction.find().sort({ rating: -1 }).limit(5);
        res.status(200).json(topRated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

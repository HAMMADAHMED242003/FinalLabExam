const express = require('express');
const {
    createVisitor,
    getVisitors,
    getVisitorById,
    updateVisitor,
    deleteVisitor
} = require('../controllers/visitorController');

const router = express.Router();

// Create a new visitor
router.post('/', createVisitor);

// Get all visitors
router.get('/', getVisitors);

// Get a specific visitor by ID
router.get('/:id', getVisitorById);

// Update a visitor by ID
router.put('/:id', updateVisitor);

// Delete a visitor by ID
router.delete('/:id', deleteVisitor);



module.exports = router;

const express = require('express');
const {
    createAttraction,
    getAttractions,
    getTopRatedAttractions,
    getAttractionById,
    updateAttraction,
    deleteAttraction
} = require('../controllers/attractionController');
const {
    validateCreateAttraction,
    validateUpdateAttraction,
    validateDeleteAttraction
} = require('../middlewares/validation');

const router = express.Router();

// Create a new attraction with validation
router.post('/', validateCreateAttraction, createAttraction);

// Get all attractions
router.get('/', getAttractions);

// Get top-rated attractions
router.get('/top-rated', getTopRatedAttractions);

// Get a specific attraction by ID
router.get('/:id', getAttractionById);

// Update an attraction by ID with validation
router.put('/:id', validateUpdateAttraction, updateAttraction);

// Delete an attraction by ID with validation
router.delete('/:id', validateDeleteAttraction, deleteAttraction);


module.exports = router;

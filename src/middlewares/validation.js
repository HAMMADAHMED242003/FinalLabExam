const { body, param, validationResult } = require('express-validator');

// Validation for creating an attraction
exports.validateCreateAttraction = [
    body('name').notEmpty().withMessage('Attraction name is required'),
    body('location').notEmpty().withMessage('Attraction location is required'),
    body('entryFee').isNumeric().withMessage('Entry fee should be a number').isFloat({ min: 0 }).withMessage('Entry fee cannot be negative'),
    body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation for updating an attraction
exports.validateUpdateAttraction = [
    param('id').isMongoId().withMessage('Invalid attraction ID format'),
    body('name').optional().notEmpty().withMessage('Attraction name cannot be empty'),
    body('location').optional().notEmpty().withMessage('Attraction location cannot be empty'),
    body('entryFee').optional().isNumeric().withMessage('Entry fee should be a number').isFloat({ min: 0 }).withMessage('Entry fee cannot be negative'),
    body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation for deleting an attraction
exports.validateDeleteAttraction = [
    param('id').isMongoId().withMessage('Invalid attraction ID format'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

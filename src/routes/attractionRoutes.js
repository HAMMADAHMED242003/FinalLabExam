const express = require('express');
const {
    createAttraction,
    getAttractions,
    getTopRatedAttractions,
} = require('../controllers/attractionController');

const router = express.Router();

router.post('/', createAttraction);
router.get('/', getAttractions);
router.get('/top-rated', getTopRatedAttractions);

module.exports = router;

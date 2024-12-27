const express = require('express');
const {
    createVisitor,
    getVisitors,
    getVisitorActivity,
} = require('../controllers/visitorController');

const router = express.Router();

router.post('/', createVisitor);
router.get('/', getVisitors);
router.get('/activity', getVisitorActivity);

module.exports = router;

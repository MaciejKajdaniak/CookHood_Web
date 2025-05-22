const express = require('express');
const router = express.Router();
const { createOffer } = require('../controllers/offerController');
const authenticate = require('../middleware/authMiddleware');

router.post('/create', authenticate, createOffer);


module.exports = router;
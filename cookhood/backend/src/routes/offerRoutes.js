const express = require('express');
const router = express.Router();
const { createOffer } = require('../controllers/offerController');
const authenticate = require('../middleware/authMiddleware');

router.post('/add-offer', authenticate, createOffer);
//router.post('/favorites', authenticate, Favorites)

module.exports = router;
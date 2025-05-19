const express = require('express');
const router = express.Router();
const { createOffer } = require('../controllers/offerController');

router.post('/create', createOffer);

module.exports = router;
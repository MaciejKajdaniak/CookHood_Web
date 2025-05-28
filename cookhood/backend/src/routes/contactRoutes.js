const express = require('express');
const router = express.Router();
const { contactSeller } = require('../controllers/contactController');
const authenticate = require('../middleware/authMiddleware');

router.post('/contactSeller', authenticate, contactSeller);

module.exports = router;
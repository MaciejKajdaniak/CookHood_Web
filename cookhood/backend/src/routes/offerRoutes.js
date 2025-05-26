const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createOffer } = require('../controllers/offerController');
const authenticate = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({storage});

router.post('/create-offer', authenticate, upload.single('photo'), createOffer);
//router.post('/favorites', authenticate, Favorites)

module.exports = router;
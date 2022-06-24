const express = require('express');
const { protect } = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.route('/').get(reviewController.getAllReviews);
router.route('/:tour').post(protect, reviewController.createReview);
module.exports = router;

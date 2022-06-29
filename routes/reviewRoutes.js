const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });
router.use(protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .patch(restrictTo('user', 'admin'), reviewController.updateReview)
  .delete(restrictTo('user', 'admin'), reviewController.deleteReview)
  .get(reviewController.getReview);
module.exports = router;

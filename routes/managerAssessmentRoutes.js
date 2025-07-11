const express = require('express');
const router = express.Router();
const {
  getAssessmentForReview,
  submitManagerReview
} = require('../controllers/managerAssessmentController');
const { authorizeRole } = require('../middlewares/roleMiddleware');

// Seuls les managers peuvent accéder à ces routes
router.get('/:selfAssessmentId', authorizeRole('Manager'), getAssessmentForReview);
router.post('/', authorizeRole('Manager'), submitManagerReview);

module.exports = router;

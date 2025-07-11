const express = require('express');
const router = express.Router();
const {
  getOrCreateAssessment,
  bulkAddGoals,
  completeAssessment
} = require('../controllers/selfAssessmentController');

// GET /self-assessments?cycle=ID
router.get('/', getOrCreateAssessment);

// POST /self-assessments/goals
router.post('/goals', bulkAddGoals);

// POST /self-assessments/complete
router.post('/complete', completeAssessment);

module.exports = router;

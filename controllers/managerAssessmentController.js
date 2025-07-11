const ManagerAssessment = require('../models/ManagerAssessment');
const SelfAssessment = require('../models/SelfAssessment');
const Goal = require('../models/Goal');

const getAssessmentForReview = async (req, res) => {
  try {
    const { selfAssessmentId } = req.params; // Récupère l'ID mya3 selfAssm depuis les paramètres de la requête
    const selfAssessment = await SelfAssessment.findById(selfAssessmentId).populate('user');  //
    // Récupérer les objectifs (Goals)
    const goals = await Goal.find({ selfAssessment: selfAssessmentId });
    res.json({ selfAssessment, goals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const submitManagerReview = async (req, res) => {
  try {
    const { selfAssessment, ratings } = req.body;//
    const review = new ManagerAssessment({ // Créer une nouvelle instance de ManagerAssessment
      selfAssessment,
      manager: req.user.id, //
      ratings,// Les évaluations fournies par le manager
      completedAt: new Date() 
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAssessmentForReview, submitManagerReview };

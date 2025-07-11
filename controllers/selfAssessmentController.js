const SelfAssessment = require('../models/SelfAssessment');
const Goal = require('../models/Goal');

const getOrCreateAssessment = async (req, res) => {
  try {
    let assessment = await SelfAssessment.findOne({ user: req.user.id, cycle: req.query.cycle });
    if (!assessment) {  //
      assessment = await SelfAssessment.create({ user: req.user.id, cycle: req.query.cycle });
    }
    res.json(assessment); // Renvoie l’évaluation existante ou nouvellement créée
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const  bulkAddGoals = async (req, res) => {
  try {
    const { selfAssessmentId, goals } = req.body; // khoudh el selfAssessmentId w el goals men body mtaa requête
    const createdGoals = await Goal.insertMany(goals.map(desc => ({ //
      description: desc, // description mtaa goal
      selfAssessment: selfAssessmentId //
    })));
    res.status(201).json(createdGoals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const completeAssessment = async (req, res) => {
  try {
    const { selfAssessmentId } = req.body;
    const updated = await SelfAssessment.findByIdAndUpdate(
      selfAssessmentId,
      { completedAt: new Date() },
      { new: true } // Renvoie l’évaluation mise à jour
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getOrCreateAssessment,  bulkAddGoals, completeAssessment };

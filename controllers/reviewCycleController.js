const ReviewCycle = require('../models/ReviewCycle');
// Create a new review cycle
const createCycle = async (req, res) => {
  try {
    const cycle = new ReviewCycle(req.body);// Create a new instance of ReviewCycle with the request body
    await cycle.save();
    res.status(201).json(cycle); // Respond with the created cycle
  } catch (err) {
    res.status(400).json({ error: err.message }); //  errors 
  }
};
// List all review cycles
const listCycles = async (req, res) => {
  try {
    const cycles = await ReviewCycle.find(); // récupère tous les cycles dans la base de données.
    res.json(cycles); // les renvoie en réponse JSON.
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update the status of a review cycle
const updateCycleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const cycle = await ReviewCycle.findByIdAndUpdate(id, { status: req.body.status }, { new: true });//Modifie le champ status du cycle avec cet ID.
    res.json(cycle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createCycle, listCycles, updateCycleStatus };

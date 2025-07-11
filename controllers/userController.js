const User = require('../models/User');
//les infos de l’utilisateur actuellement connecté.
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: 'Manager' }).select('name email');
    res.json(managers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCurrentUser, listManagers };

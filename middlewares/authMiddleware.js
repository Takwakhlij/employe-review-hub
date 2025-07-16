const jwt = require('jsonwebtoken');



const authenticateJWT = (req, res, next) => {
  // Récupérer le header Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Pas de token ou mauvais format
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }

  // Extraire le token (après "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter les infos décodées au req.user pour que les routes y aient accès
    req.user = decoded;

    next(); // passer au middleware/route suivant.e
  } catch (error) {
    // Token invalide ou expiré
    return res.status(403).json({ message: 'Token invalide ou expiré' });
  }
};

module.exports = { authenticateJWT };

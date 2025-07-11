const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');// Importer le contrôleur d'authentification
router.post('/login', login);

module.exports = router;

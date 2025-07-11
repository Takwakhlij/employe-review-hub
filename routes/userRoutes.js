const express = require('express');
const router = express.Router();
const { getCurrentUser, listManagers } = require('../controllers/userController');

router.get('/', getCurrentUser);
router.get('/managers', listManagers);

module.exports = router;

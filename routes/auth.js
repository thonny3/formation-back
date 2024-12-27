const express = require('express');
const router = express.Router();
const Auth = require('../controllers/authController');


router.post('/login', Auth.loginUtilisateur);
router.post('/refresh-token', Auth.refreshToken)

module.exports = router;

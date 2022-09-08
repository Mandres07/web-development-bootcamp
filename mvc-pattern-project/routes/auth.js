const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.get('/signup', authController.getSignUp);
router.get('/login', authController.getLogin);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/401', authController.get401);

module.exports = router;
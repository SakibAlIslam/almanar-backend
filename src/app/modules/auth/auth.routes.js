const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const {verifyToken} = require('./auth.middleware');

const { register, login, changePassword, forgetPassword } = authController; // Destructure the functions from the controller

router.post('/register', register);
router.post('/login', login);
router.post('/change-password', verifyToken, changePassword);
router.post('/forget-password', forgetPassword);

module.exports = router;

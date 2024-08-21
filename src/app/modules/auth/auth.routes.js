const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

const { register, login } = authController; // Destructure the functions from the controller

router.post('/register', register);
router.post('/login', login);

module.exports = router;

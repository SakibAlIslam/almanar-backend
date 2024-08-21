const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

// Import routes
const authRoutes = require('./modules/auth/auth.routes');

const app = express();
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);

module.exports = app;

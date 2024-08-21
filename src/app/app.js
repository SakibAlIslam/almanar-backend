const express = require('express');
const dotenv = require('dotenv');
// Import routes
const authRoutes = require('./modules/auth/auth.routes');

dotenv.config();

const app = express();
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);

module.exports = app;

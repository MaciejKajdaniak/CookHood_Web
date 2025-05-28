const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const offerRoutes = require('./routes/offerRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use(express.json());
app.use('/api/offers', offerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);
app.use(cors());

module.exports = app;

require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const offerRoutes  = require('./src/routes/offerRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const path = require('path');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api', contactRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server działa na porcie: ${PORT}`));
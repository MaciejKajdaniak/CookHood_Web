const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const offerRoutes  = require('./routes/offerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api', contactRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server działa na porcie: ${PORT}`));
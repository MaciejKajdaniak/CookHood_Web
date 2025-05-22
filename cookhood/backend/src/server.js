const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const offerRoutes  = require('./routes/offerRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/offers', offerRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server działa na porcie: ${PORT}`));
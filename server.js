const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const { authenticateJWT } = require('./middlewares/authMiddleware');
const userRoutes = require('./routes/userRoutes'); // n’oublie pas d’importer userRoutes
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express(); // <- déclaration avant tout usage

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware + Routes protégées
app.use('/users', authenticateJWT, userRoutes);

// Routes publiques
app.use('/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

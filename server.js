const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');

// Chargement des routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewCycleRoutes = require('./routes/reviewCycleRoutes');
const selfAssessmentRoutes = require('./routes/selfAssessmentRoutes');
const managerAssessmentRoutes = require('./routes/managerAssessmentRoutes');

// Middlewares
const { authenticateJWT } = require('./middlewares/authMiddleware');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes publiques
app.use('/auth', authRoutes);

// Routes protégées (authentification requise)
app.use('/users',  userRoutes);
app.use('/cycles', authenticateJWT, reviewCycleRoutes);
app.use('/self-assessments', authenticateJWT, selfAssessmentRoutes);
app.use('/manager-assessments', authenticateJWT, managerAssessmentRoutes);

// Route d'accueil
app.get('/', (req, res) => {
  res.send('Employee Performance Review Hub API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

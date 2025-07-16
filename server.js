const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const { authenticateJWT } = require('./middlewares/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const reviewCycleRoutes = require('./routes/reviewCycleRoutes');
const selfAssessmentRoutes = require('./routes/selfAssessmentRoutes');
const managerAssessmentRoutes = require('./routes/managerAssessmentRoutes');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    express.json()(req, res, next);
  } else {
    next();
  }
});

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
app.use('/review-cycles', authenticateJWT, reviewCycleRoutes);
app.use('/self-assessments', selfAssessmentRoutes);
app.use('/manager-assessments', authenticateJWT, managerAssessmentRoutes);


// Routes publiques
app.use('/auth', authRoutes);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

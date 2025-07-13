const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewCycleRoutes = require('./routes/reviewCycleRoutes');
const selfAssessmentRoutes = require('./routes/selfAssessmentRoutes');
const managerAssessmentRoutes = require('./routes/managerAssessmentRoutes');

const { authenticateJWT } = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

//  Middleware pour parser JSON
app.use(express.json()); 

// Sécurité HTTP headers
app.use(helmet());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/users', authenticateJWT, userRoutes);
app.use('/cycles', authenticateJWT, reviewCycleRoutes);
app.use('/self-assessments', authenticateJWT, selfAssessmentRoutes);
app.use('/manager-assessments', authenticateJWT, managerAssessmentRoutes);

//  Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

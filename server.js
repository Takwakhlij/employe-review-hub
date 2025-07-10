const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
const helmet = require('helmet'); //  Security middleware
const authRoutes = require('./routes/AuthRoute');// Import authentication routes
dotenv.config(); // Load environment variables from .env file
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.use(helmet()); 
// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.error(" MongoDB Error", err));

// Test route
app.get('/', (req, res) => res.send('API Running'));


// Routes
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 5000; //
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

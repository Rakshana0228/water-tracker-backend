const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const intakeRoutes = require('./routes/intakeRoutes');
const goalRoutes = require('./routes/goalRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/intake', intakeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/profile', profileRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('✅ Water Intake Tracker Backend is running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    // ✅ Only start server locally (not on Vercel)
    if (!process.env.VERCEL) {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });

// ✅ Export app for Vercel
module.exports = app;

// routes/goalRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Save or update goal
router.post('/', async (req, res) => {
  const { userId, goal } = req.body;
  if (!userId || !goal) {
    return res.status(400).json({ message: 'Missing userId or goal' });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { goal }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Goal saved successfully', goal: user.goal });
  } catch (err) {
    console.error('Error saving goal:', err);
    res.status(500).json({ message: 'Error saving goal', error: err });
  }
});

// Get goal
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ goal: user.goal || 3000 });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching goal', error: err });
  }
});

module.exports = router;

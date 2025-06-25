const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/profile/:userId
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId, '-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err });
  }
});

// PUT /api/profile/:userId
router.put('/:userId', async (req, res) => {
  const { username, goal } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { username, goal },
      { new: true }
    );
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err });
  }
});

module.exports = router;

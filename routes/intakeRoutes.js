// routes/intakeRoutes.js
const express = require('express');
const router = express.Router();
const Intake = require('../models/Intake');

// POST: Add new intake
router.post('/', async (req, res) => {
  console.log('📥 Intake request body:', req.body); // ← log incoming request

  const { userId, value } = req.body;

  if (!userId || !value) {
    console.log('❌ Missing userId or value');
    return res.status(400).json({ message: 'Missing userId or value' });
  }

  try {
    const intake = new Intake({ userId, value, time: new Date() });
    await intake.save();
    res.status(201).json(intake);
  } catch (error) {
    console.error('🔥 Error saving intake:', error);
    res.status(500).json({ message: 'Error adding intake' });
  }
});

// GET: Intake history by user
router.get('/:userId', async (req, res) => {
  try {
    const history = await Intake.find({ userId: req.params.userId }).sort({ time: 1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch intake history', error: err });
  }
});

module.exports = router;

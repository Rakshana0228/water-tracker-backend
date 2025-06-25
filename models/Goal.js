// models/Goal.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  goalAmount: { type: Number, default: 3000 }
});

module.exports = mongoose.model('Goal', goalSchema);

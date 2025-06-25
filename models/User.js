// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  goal: {
    type: Number,
    default: 3000
  }
});

module.exports = mongoose.model('User', userSchema);

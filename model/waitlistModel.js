const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);
module.exports = Waitlist;

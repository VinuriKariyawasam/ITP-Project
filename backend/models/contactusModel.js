const mongoose = require('mongoose');

const contactusSchema = new mongoose.Schema({
  cusName: {
    type: String,
    required: true
  },
  cusEmail: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const contactus = mongoose.model('ContactUs', contactusSchema);

module.exports = contactus;
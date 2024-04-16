// models/Job.js

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  task: {
    type: String,
    enum: ['Service', 'testRun'], // Example task types
    required: true,
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employees', // Reference to the Technician model
    required: true,
  },
 
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

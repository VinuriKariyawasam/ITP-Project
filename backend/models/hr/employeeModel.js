const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // You may want to store the file path or a reference here
  },
  documents: [
    {
      type: String, // Array of file paths or references
    },
  ],
  otherDetails: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  points: {
    type: Number,
    required: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

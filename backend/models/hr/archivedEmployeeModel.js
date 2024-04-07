const mongoose = require("mongoose");

const archivedEmployeeSchema = new mongoose.Schema({
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
    enum: [
      "HR Manager",
      "Inventory Manager",
      "Service Manager",
      "Finance Manager",
      "Supervisor",
      "Technician",
    ],
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
    required: function () {
      // Require email field only for manager or supervisor positions
      return this.position === "Manager" || this.position === "Supervisor";
    },
    match: [
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email address",
    ],
  },
  password: {
    type: String,
    required: function () {
      // Require password field only for manager or supervisor positions
      return this.position === "Manager" || this.position === "Supervisor";
    },
  },
  basicSalary: {
    type: Number,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  account: {
    type: Number,
    required: true,
  },
});

const ArchivedEmployee = mongoose.model(
  "ArchivedEmployee",
  archivedEmployeeSchema
);

module.exports = ArchivedEmployee;

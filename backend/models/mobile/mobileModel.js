const mongoose = require("mongoose");

const mrequestsSchema = new mongoose.Schema({
  cusName: {
    type: String,
    required: true,
  },
  cusEmail: {
    type: String,
    required: true,
    match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
        "Invalid email address",
      ],
  },
  vehicleNo: {
    type: String,
    required: true,
    match: [
      /^[A-Z0-9]+(-[0-9]+)*$/i,
      "Invalid Vehicle Number format",
    ],
  },
  reqDate: {
    type: String,
    required: true,
    match: [
      /^([0-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/i,
      "Invalid Date format",
    ],
  },
  reqTime: {
    type: String,
    required: true,
    match: [
      /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/i,
      "Invalid Time format",
    ],
  },
  reqLocation: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
    match: [
      /^[0-9]{10}$/i,
      "Invalid Contact No",
    ],
  },
  technician: {
    type: String,
  },

},{timestamps:true});

module.exports = mongoose.model("MRequests", mrequestsSchema);
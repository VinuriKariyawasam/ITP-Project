const mongoose = require("mongoose");

const breakdownrequestsSchema = new mongoose.Schema({
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

module.exports = mongoose.model("BreakdownRequests", breakdownrequestsSchema);

/*
match: [
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  "Invalid email address",
],*/
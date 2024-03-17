const mongoose = require("mongoose");

const mrequestsSchema = new mongoose.Schema({
  cusNameOrId: {
    type: String,
    required: true,
  },
  cusEmail: {
    type: String,
    required: true,
    match: [
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "Invalid email address",
      ],
  },
  vehicleNo: {
    type: String,
    required: true,
  },
  reqDate: {
    type: Date,
    required: true,
  },
  reqTime: {
    type: Time,
    required: true,   //
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
  },

});

module.exports = mongoose.model("MRequests", mrequestsSchema);
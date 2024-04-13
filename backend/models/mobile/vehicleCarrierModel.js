const mongoose = require("mongoose");

const carrierrequestsSchema = new mongoose.Schema({
  cusName: {
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
    match: [
      /^[A-Za-z0-9]{1,10}$/i,
      "Invalid Vehicle Number format",
    ],
  },
  reqDate: {
    type: Date,
    required: true,
    match: [
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/i,
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
  additionalInfo: {
    type: String,
    //required: true,
  },
  contactNo: {
    type: String,
    required: true,
    match: [
      /^[0-9]{10}$/i,
      "Invalid Contact No",
    ],
  },

},{timestamps:true});

module.exports = mongoose.model("CarrierRequests", carrierrequestsSchema);
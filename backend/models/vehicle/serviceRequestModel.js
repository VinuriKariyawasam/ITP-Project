const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
  vehicleNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  quotation: {
    type: Number,
    required: true,
  },
  request: {
    type: String,
    required: true,
  },
  report: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    required: true,
  },
});

const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);

module.exports = ServiceRequest;

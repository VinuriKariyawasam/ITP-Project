const mongoose = require("mongoose");

const ServiceRequestSchema = new mongoose.Schema({
  vehicleNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
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
    type: String,
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
  },
});

const ServiceRequestModel = mongoose.model(
  "serviceRequests",
  ServiceRequestSchema
);

module.exports = ServiceRequestModel;
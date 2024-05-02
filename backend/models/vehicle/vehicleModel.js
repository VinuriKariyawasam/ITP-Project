const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  vehicleNo: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['government', 'nonGovernment'], // Add 'government' to the enum
    required: true
  },
  records: [
    {
      type: String, // Array of file paths or references
    },
  ],
});

const VehicleModel = mongoose.model("vehicles", VehicleSchema);

module.exports = VehicleModel;

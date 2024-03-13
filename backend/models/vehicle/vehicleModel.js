const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
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
  documents: [
    {
      type: String, // Array of file paths or references
    },
  ],
  password: {
    type: String,
    required: function () {
      // Require password field only for supervisor positions
      this.position === "Supervisor";
    },
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
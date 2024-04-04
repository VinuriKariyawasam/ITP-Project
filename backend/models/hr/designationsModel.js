const mongoose = require("mongoose");

const designationsSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  basicSalary: {
    type: Number,
    required: true,
  },
});

const Designations = mongoose.model("Designations", designationsSchema);

module.exports = Designations;

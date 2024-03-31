const mongoose = require("mongoose");

const designationsSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  basicSalary: {
    type: String,
    required: true,
  },
});

const Leaves = mongoose.model("Designations", designationsSchema);

module.exports = Designations;

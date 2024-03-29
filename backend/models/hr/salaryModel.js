const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  basicSalary: {
    type: String,
    required: true,
  },
});

const Leaves = mongoose.model("Salary", salarySchema);

module.exports = Salary;

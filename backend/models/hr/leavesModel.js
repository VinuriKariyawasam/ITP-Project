const mongoose = require("mongoose");

const leavesSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Approved", "Rejected", "Pending"],
  },
});

const Leaves = mongoose.model("Leaves", leavesSchema);

module.exports = Leaves;

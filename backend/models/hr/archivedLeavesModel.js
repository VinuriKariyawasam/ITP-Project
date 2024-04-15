const mongoose = require("mongoose");

const archiveLeavesSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
  },
  empDBId: {
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
  reqDate: {
    type: Date,
    required: true,
  },
  archDate: {
    type: Date,
    required: true,
  },
});

const ArchiveLeaves = mongoose.model("ArchiveLeaves", archiveLeavesSchema);

module.exports = ArchiveLeaves;

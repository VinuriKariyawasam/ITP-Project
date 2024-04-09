const mongoose = require("mongoose");

const archiveAttendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  employeeAttendance: [
    {
      name: {
        type: String,
        required: true,
      },
      value: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const ArchiveAttendance = mongoose.model(
  "ArchiveAttendance",
  archiveAttendanceSchema
);

module.exports = ArchiveAttendance;

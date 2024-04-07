const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
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
      empDBId: {
        type: String,
        required: true,
      },
      empId: {
        type: String,
        required: true,
      },
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

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;

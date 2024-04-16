const mongoose = require("mongoose");

const noPayLogSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  absentWithoutLeave: [
    {
      empDBId: {
        type: String,
        required: true,
      },
    },
  ],
});

const NoPayLogs = mongoose.model("NoPayLogs", noPayLogSchema);

module.exports = NoPayLogs;

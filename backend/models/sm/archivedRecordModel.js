const mongoose = require("mongoose");

const archivedRecordSchema = new mongoose.Schema({
  vnumber: {
    type: String,
    required: true,
    },

  startDate: {
    type: Date,
    required: true,
  },
  inumber: {
    type: String,
    required: true,
  },
  
  EndDate: {
    type: Date,
    required: true,
  },

  quotation: {
    type: String, // You may want to store the file path or a reference here
  },
  documents: [
    {
      type: String, // Array of file paths or references
    },
  ],
  otherDetails: {
    type: String,
  },
  email: {
    type: String,
    required: function () {
      // Require email field only for manager or supervisor positions
      return this.position === "Manager" || this.position === "Supervisor";
    },
    match: [
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email address",
    ],
  },
  password: {
    type: String,
    required: function () {
      // Require password field only for manager or supervisor positions
      return this.position === "Manager" || this.position === "Supervisor";
    },
  },
});

const ArchivedRecord = mongoose.model("ArchivedRecord", archivedRecordSchema);

module.exports = ArchivedRecord;
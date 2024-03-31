const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
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

  photo: {
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
 
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
const mongoose = require("mongoose");
const IncomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    serviceInvoiceId: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    type: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },

    status: {
      type: String,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Income", IncomeSchema);

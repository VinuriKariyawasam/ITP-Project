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
      default: "Income",
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
      maxLength: 10,
    },

    status: {
      type: String,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Income", IncomeSchema);

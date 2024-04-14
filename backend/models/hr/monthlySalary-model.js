const mongoose = require("mongoose");

const monthlySalarySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  status:{
    type:String,
    default:"pending"
  },

  salaries: [
    {
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
      position: {
        type: String,
        required: true,
      },
      basicSalary: {
        type: Number,
        required: true,
      },
      allowance: {
        type: Number,
        required: true,
      },
      totalSal: {
        type: Number,
        required: true,
      },
      noPay: {
        type: Number,
        required: true,
      },
      EPFC: {
        type: Number,
        required: true,
      },
      EPFE: {
        type: Number,
        required: true,
      },
      EPFT: {
        type: Number,
        required: true,
      },
      ETF: {
        type: Number,
        required: true,
      },
      netSal: {
        type: Number,
        required: true,
      },
      bank: {
        type: String,
        required: true,
      },
      branch: {
        type: String,
        required: true,
      },
      account: {
        type: Number,
        required: true,
      },
    },
  ],
});

const MonthlySalary = mongoose.model("MonthlySalary", monthlySalarySchema);

module.exports = MonthlySalary;

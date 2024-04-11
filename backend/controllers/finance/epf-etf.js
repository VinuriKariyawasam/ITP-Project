const { config } = require("dotenv");
const monthlySalarySchema=require('../../models/hr/monthlySalary-model')





const getMonthlySalaryList = async (req, res) => {
  try {
    const monthlySalaries = await monthlySalarySchema.find();
    res.status(200).json(monthlySalaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMonthlySalaryList
};

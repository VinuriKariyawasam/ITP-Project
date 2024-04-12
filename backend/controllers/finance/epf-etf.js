const { config } = require("dotenv");
const monthlySalarySchema=require('../../models/hr/monthlySalary-model')
const empBenefitsSchema=require('../../models/finance/empbenefitsModel')





const getMonthlySalaryList = async (req, res) => {
  try {
    const monthlySalaries = await monthlySalarySchema.find();
    res.status(200).json(monthlySalaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addEmpBenefits = async (req, res) => {
    try {
       
        const { employeeId, employeeName, epfTotal, etfTotal } = req.body;
       
        const newEmpBenefits = new empBenefitsSchema({
            employeeId,
            employeeName,
            epfTotal,
            etfTotal
        });

       
        await newEmpBenefits.save();

        
        res.status(201).json({ message: 'EmpBenefits data added successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error adding EmpBenefits data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addEmpBenefits,getMonthlySalaryList
};

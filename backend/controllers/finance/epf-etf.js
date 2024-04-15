const { config } = require("dotenv");
const monthlySalarySchema = require("../../models/hr/monthlySalary-model");
const empBenefitsSchema = require("../../models/finance/empbenefitsModel");

const getMonthlySalaryList = async (req, res) => {
  try {
    const monthlySalaries = await monthlySalarySchema.find();
    res.status(200).json(monthlySalaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingSalaryLists = async (req, res) => {
  try {
    // Find all monthly salary lists with status set to 'pending'
    const pendingSalaryLists = await monthlySalarySchema.find({
      status: "pending",
    });
    res.status(200).json(pendingSalaryLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEmpBenefits = async (req, res) => {
  try {
    const { employeeid, employeeName, updatedDate, epftotal, etftotal } =
      req.body;

    const newEmpBenefits = new empBenefitsSchema({
      employeeid,
      employeeName,
      epftotal,
      etftotal,
      updatedDate,
    });

    await newEmpBenefits.save();

    res.status(201).json({ message: "EmpBenefits data added successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error adding EmpBenefits data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllEmpBenefits = async (req, res) => {
  try {
    // Fetch all employee benefit records from the database
    const allEmpBenefits = await empBenefitsSchema.find();

    // Send the fetched records as a response
    res.status(200).json(allEmpBenefits);
  } catch (error) {
    // Handle errors
    console.error("Error getting all EmpBenefits data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateSalaryListStatus = async (req, res) => {
  const { id } = req.params; // Assuming you're passing the ID in the request parameters
  const { status } = req.body;

  try {
    // Find the monthly salary entry by ID
    const monthlySalary = await monthlySalarySchema.findById(id);

    if (!monthlySalary) {
      return res.status(404).json({ error: 'Monthly salary entry not found' });
    }

    // Update the status
    monthlySalary.status = status;
    
    // Save the updated entry
    await monthlySalary.save();

    // Respond with the updated entry
    res.json(monthlySalary);
  } catch (error) {
    console.error('Error updating monthly salary status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  addEmpBenefits,
  getMonthlySalaryList,
  getAllEmpBenefits,
  getPendingSalaryLists,
  updateSalaryListStatus,

};

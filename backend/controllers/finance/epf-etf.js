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

module.exports = {
  addEmpBenefits,
  getMonthlySalaryList,
  getAllEmpBenefits,
  getPendingSalaryLists,
};

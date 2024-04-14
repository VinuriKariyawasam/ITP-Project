const mongoose = require('mongoose'); // Import Mongoose
const EmpBenefits = require('../../models/finance/empbenefitsModel'); // Import EmpBenefits model
const express = require('express');
const router = express.Router();

// Controller function to process salary list and update employee benefits
const processSalaryList = async (req, res) => {
  const { salarylist } = req.body; // Assuming the salary list data is sent in the request body
  console.log(salarylist);

  try {
    // Iterate through each salary list entry
    for (const entry of salarylist) {
      // Process entry and update employee benefits
      await updateEmpBenefits(entry);
    }

    res.status(200).json({ message: 'Salary list processed successfully.' });
  } catch (error) {
    console.error('Error processing salary list:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Function to update employee benefits based on salary list entry
const updateEmpBenefits = async (entry) => {
  const { empId, EPFT, ETF } = entry;

  try {
    // Find existing employee benefits record by empId
    let empBenefits = await EmpBenefits.findOne({ employeeid: empId });

    // If employee benefits record doesn't exist, create a new one
    if (!empBenefits) {
      empBenefits = new EmpBenefits({
        employeeid: empId,
        employeeName: entry.name,
        updatedDate: new Date().toISOString(),
        epftotal: 0,
        etftotal: 0
      });
    }

    // Update EPF and ETF totals
    empBenefits.epftotal += EPFT;
    empBenefits.etftotal += ETF;

    // Update the updatedDate
    empBenefits.updatedDate = new Date().toISOString();

    // Save the updated employee benefits record
    await empBenefits.save();
  } catch (error) {
    console.error('Error updating employee benefits:', error);
    throw error; // Rethrow the error to be caught by the calling function
  }
};

module.exports = { processSalaryList };

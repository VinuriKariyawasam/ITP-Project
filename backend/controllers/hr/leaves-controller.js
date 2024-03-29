const Leaves = require("../../models/hr/leavesModel");
const { validationResult } = require("express-validator");

const leavesController = {
  // Create a new leave record
  createLeave: async (req, res) => {
    console.log(req.body);
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Inavalid values passed in the form.",
        });
      }
      const { empId, empDBId, name, fromDate, toDate, reason, status } =
        req.body;

      // Convert the fromDate and toDate strings to Date objects
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);

      // Check if there are any existing leave records for the same employee
      // with status "Approved" or "Pending" that overlap with the requested date range
      const existingLeaveRecords = await Leaves.find({
        empId: empId,
        status: { $in: ["Approved", "Pending"] },
        $or: [
          { fromDate: { $lte: toDateObj }, toDate: { $gte: fromDateObj } },
          { fromDate: { $gte: fromDateObj, $lte: toDateObj } },
        ],
      });

      // If there are overlapping leave records, return an error response
      if (existingLeaveRecords.length > 0) {
        return res.status(422).json({
          error: "Leave request overlaps with existing leave records.",
        });
      }

      // Calculate the difference in milliseconds
      const differenceMs = toDateObj.getTime() - fromDateObj.getTime();

      // Convert milliseconds to days
      const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

      //get requested date
      const today = new Date();

      const newLeave = new Leaves({
        empId,
        empDBId,
        name,
        fromDate,
        toDate,
        reason,
        status,
        days: daysDifference,
        reqDate: today,
      });
      const savedLeave = await newLeave.save();
      res.status(201).json(savedLeave);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all leave records
  getAllLeaves: async (req, res) => {
    try {
      const allLeaves = await Leaves.find();
      res.json(allLeaves);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a single leave record by ID
  getLeaveById: async (req, res) => {
    try {
      const leave = await Leaves.findById(req.params.id);
      if (!leave) {
        return res.status(404).json({ error: "Leave not found" });
      }
      res.json(leave);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a leave record by ID
  updateLeaveById: async (req, res) => {
    try {
      const updatedLeave = await Leaves.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedLeave) {
        return res.status(404).json({ error: "Leave not found" });
      }
      res.json(updatedLeave);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a leave record by ID
  deleteLeaveById: async (req, res) => {
    try {
      const deletedLeave = await Leaves.findByIdAndDelete(req.params.id);
      if (!deletedLeave) {
        return res.status(404).json({ error: "Leave not found" });
      }
      res.status(204).send(); // No content in response for successful deletion
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = leavesController;

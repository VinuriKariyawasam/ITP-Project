const Leaves = require("../../models/hr/leavesModel");
const { validationResult } = require("express-validator");
const ArchiveLeaves = require("../../models/hr/archivedLeavesModel");

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
        days: daysDifference + 1,
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
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Inavalid values passed in the form.",
        });
      }
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

  // Approve or reject a leave record by ID
  updateLeaveStatusById: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status || (status !== "Approved" && status !== "Rejected")) {
        return res.status(400).json({ error: "Invalid status provided" });
      }

      const updatedLeave = await Leaves.findByIdAndUpdate(
        id,
        { status }, // Update status to the provided value
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

  // Controller function to get leaves by empDBId
  getLeavesByEmpDBId: async (req, res) => {
    try {
      const { empDBId } = req.params; // Get empDBId from request parameters

      // Find leaves by empDBId
      const leaves = await Leaves.find({ empDBId });

      // Check if leaves exist
      if (!leaves || leaves.length === 0) {
        return res
          .status(404)
          .json({ message: "No leaves found for this employee." });
      }

      // Return leaves
      res.status(200).json(leaves);
    } catch (error) {
      console.error("Error fetching leaves by empDBId:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Controller function to archive leaves
  getAndArchiveLeaves: async (req, res) => {
    try {
      // Get all approved leaves older than 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const approvedLeaves = await Leaves.find({
        status: "Approved",
        reqDate: { $lt: sixMonthsAgo },
      });

      // Save filtered leaves to ArchiveLeaves model with current date as archDate
      const archiveLeavesPromises = approvedLeaves.map(async (leave) => {
        const archivedLeave = new ArchiveLeaves({
          empId: leave.empId,
          empDBId: leave.empDBId,
          name: leave.name,
          days: leave.days,
          fromDate: leave.fromDate,
          toDate: leave.toDate,
          reason: leave.reason,
          status: leave.status,
          reqDate: leave.reqDate,
          archDate: new Date(),
        });
        await archivedLeave.save();
      });

      await Promise.all(archiveLeavesPromises);

      // Delete leaves older than 6 months from Leaves model
      const deleteResult = await Leaves.deleteMany({
        reqDate: { $lt: sixMonthsAgo },
      });

      console.log("Leaves archived and deleted successfully.");
      res.status(200).json(deleteResult);
    } catch (error) {
      console.error("Error archiving and deleting leaves:", error);
      res.status(500).json({
        error: "An error occurred while archiving and deleting leaves.",
      });
    }
  },

  // Get all archivedleaves records
  getArchivedLeaves: async (req, res) => {
    try {
      const allLeaves = await ArchiveLeaves.find();
      res.json(allLeaves);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = leavesController;

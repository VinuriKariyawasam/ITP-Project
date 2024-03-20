const Leaves = require("../../models/hr/leavesModel");

const leavesController = {
  // Create a new leave record
  createLeave: async (req, res) => {
    try {
      const newLeave = new Leaves(req.body);
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

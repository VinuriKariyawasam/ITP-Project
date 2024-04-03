const Designations = require("../../models/hr/designationsModel");

class DesignationsController {
  // CREATE - POST
  static async create(req, res) {
    try {
      const newDesignation = await Designations.create(req.body);
      res.status(201).json(newDesignation);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // READ - GET
  static async getAll(req, res) {
    try {
      const designations = await Designations.find();
      res.json(designations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // UPDATE - PUT
  static async update(req, res) {
    try {
      const updatedDesignation = await Designations.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedDesignation);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // DELETE - DELETE
  static async delete(req, res) {
    try {
      await Designations.findByIdAndRemove(req.params.id);
      res.json({ message: "Designation deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = DesignationsController;

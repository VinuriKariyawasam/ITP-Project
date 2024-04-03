const Designations = require("../../models/hr/designationsModel");
const { validationResult } = require("express-validator");



class DesignationsController {
  // CREATE - POST
  static async create(req, res) {
    try {

      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Inavalid values passed in the form.",
        });
      }
      // Check if the position already exists
      const existingDesignation = await Designations.findOne({
        position: req.body.position,
      });
      if (existingDesignation) {
        return res.status(422).json({ message: "Designation already exists" });
      }

      // If position does not exist, create the new designation

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

      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Inavalid values passed in the form.",
        });
      }

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

      const id = req.params.id;
      console.log(id);
      const result = await Designations.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ error: "Designation not found" });
      }

      await Designations.findByIdAndRemove(req.params.id);

      res.json({ message: "Designation deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = DesignationsController;

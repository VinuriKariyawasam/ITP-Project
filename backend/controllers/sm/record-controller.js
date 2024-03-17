const RecordModel = require("../../models/sm/recordModel"); // Import your record model
const HttpError = require("../../models/sm/http-error");

class RecordController {
  // Create record
  static async createRecord(req, res) {
    try {
      const newRecord = new RecordModel(req.body);
      const savedRecord = await newRecord.save();
      res.status(201).json(savedRecord);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all records
  static async getRecords(req, res) {
    try {
      const records = await RecordModel.find();
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get record by ID
  static async getRecordById(req, res) {
    try {
      const record = await RecordModel.findById(req.params.id);
      if (!record) {
        throw new HttpError("Record not found", 404);
      }
      res.status(200).json(record);
    } catch (error) {
      res.status(error.code || 500).json({ error: error.message });
    }
  }

  /* Update employee by ID
  static async updateEmployeeById(req, res) {
    try {
      const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedEmployee) {
        throw new HttpError("Employee not found", 404);
      }
      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete employee by ID
  static async deleteEmployeeById(req, res) {
    try {
      const deletedEmployee = await EmployeeModel.findByIdAndDelete(
        req.params.id
      );
      if (!deletedEmployee) {
        throw new HttpError("Employee not found", 404);
      }
      res.status(204).json(); // No content in response for successful deletion
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }*/
}

module.exports = RecordController;
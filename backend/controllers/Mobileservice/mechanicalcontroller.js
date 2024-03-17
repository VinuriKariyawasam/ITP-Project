const MechanicalModel = require("../../models/Mobileservice/mechanicalModel"); // Import my mechanical service model
const HttpError = require("../../models/http-error");

class MechanicalController {
  // Create mechanical service
  static async createMechanicalR(req, res) {
    try {
      const newMechanicalR = new MechanicalModel(req.body);
      const savedMechanicalR = await newMechanicalR.save();
      res.status(201).json(savedMechanicalR);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /*

  // Get all employees
  static async getEmployees(req, res) {
    try {
      const employees = await EmployeeModel.find();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get employee by ID
  static async getEmployeeById(req, res) {
    try {
      const employee = await EmployeeModel.findById(req.params.id);
      if (!employee) {
        throw new HttpError("Employee not found", 404);
      }
      res.status(200).json(employee);
    } catch (error) {
      res.status(error.code || 500).json({ error: error.message });
    }
  }

  // Update employee by ID
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
  }
  */
}

module.exports = EmployeeController;
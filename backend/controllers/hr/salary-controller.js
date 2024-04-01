const Salary = require("../models/Salary");

class SalaryController {
  async createSalary(req, res) {
    try {
      const { empId, empDBId, name, position, basicSalary } = req.body;
      // Calculations based on provided fields
      const allowance = 10000.0;
      const noPay = 0.0;
      const EPFC = basicSalary * 0.12;
      const EPFE = basicSalary * 0.08;
      const EPFT = EPFC + EPFE;
      const ETF = basicSalary * 0.03;
      const totalSal = basicSalary + allowance;
      const netSal = totalSal - (noPay + EPFC + ETF);

      const salary = new Salary({
        empId,
        empDBId,
        name,
        position,
        basicSalary,
        allowance,
        noPay,
        EPFC,
        EPFE,
        EPFT,
        ETF,
        totalSal,
        netSal,
      });

      await salary.save();
      res
        .status(201)
        .json({ message: "Salary created successfully", data: salary });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to create salary", error: error.message });
    }
  }

  async updateSalary(req, res) {
    try {
      const { id } = req.params;
      const updatedSalary = await Salary.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json({ message: "Salary updated successfully", data: updatedSalary });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to update salary", error: error.message });
    }
  }

  async deleteSalary(req, res) {
    try {
      const { id } = req.params;
      await Salary.findByIdAndDelete(id);
      res.json({ message: "Salary deleted successfully" });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to delete salary", error: error.message });
    }
  }

  async getAllSalaries(req, res) {
    try {
      const salaries = await Salary.find();
      res.json(salaries);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve salaries", error: error.message });
    }
  }

  async getSalaryById(req, res) {
    try {
      const { id } = req.params;
      const salary = await Salary.findById(id);
      if (!salary) {
        return res.status(404).json({ message: "Salary not found" });
      }
      res.json(salary);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve salary", error: error.message });
    }
  }
}

module.exports = new SalaryController();

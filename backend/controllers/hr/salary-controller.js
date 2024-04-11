const Salary = require("../../models/hr/salaryModel");
const MonthlySalary = require("../../models/hr/monthlySalary-model");

class SalaryController {
  /*async createSalary(req, res) {
    try {
      const {basicSalary,allowance } = req.body;
      // Calculations based on provided fields
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
  }*/
  //update salary by id
  async updateSalary(req, res) {
    try {
      const { id } = req.params;
      const { bank, branch, account } = req.body;
      const basicSalary = parseFloat(req.body.basicSalary);
      const allowance = parseFloat(req.body.allowance);
      const noPay = parseFloat(req.body.noPay);

      // Calculations based on provided fields

      const EPFC = basicSalary * 0.12;
      const EPFE = basicSalary * 0.08;
      const EPFT = EPFC + EPFE;
      const ETF = basicSalary * 0.03;
      const totalSal = basicSalary + allowance;
      const netSal = totalSal - noPay - EPFE - ETF;

      // Update the salary record with the new values
      const updatedSalary = await Salary.findByIdAndUpdate(
        id,
        {
          basicSalary,
          allowance,
          noPay,
          EPFC,
          EPFE,
          EPFT,
          ETF,
          totalSal,
          netSal,
          bank,
          branch,
          account,
        },
        { new: true }
      );

      console.log(updatedSalary);
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

  //get slary by empDBId
  async getSalaryByEmpDBId(req, res) {
    try {
      const { empDBId } = req.params;
      const salary = await Salary.findOne({ empDBId });
      if (!salary) {
        return res
          .status(404)
          .json({ message: "Salary record not found for empDBId" });
      }
      res.json(salary);
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve salary record",
        error: error.message,
      });
    }
  }

  //pass salaries to monthly-salary db
  async passSalariesToMonthlySalary(req, res) {
    try {
      // Fetch all salaries from the Salary database
      const allSalaries = await Salary.find();

      // Create a new MonthlySalary document
      const monthlySalary = new MonthlySalary({
        date: new Date(), // Set the current date
        month: req.body.month, // Assuming the month is sent in the request body
        salaries: allSalaries,
      });

      // Save the monthly salary document to the database
      await monthlySalary.save();

      res
        .status(201)
        .json({ message: "Salaries passed successfully", monthlySalary });
    } catch (error) {
      console.error("Error fetching and saving salaries:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new SalaryController();

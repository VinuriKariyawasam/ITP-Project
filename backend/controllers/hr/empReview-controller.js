const EmpReview = require("../../models/hr/empReviewModel");
const EmployeeModel = require("../../models/hr/employeeModel");

class EmpReviewController {
  // Controller to create a new employee review
  async createEmpReview(req, res) {
    try {
      console.log(req.body);
      const newReview = await EmpReview.create(req.body);

      if (!newReview) {
        return res.status(400).json({ message: "Review not created" });
      }

      console.log(newReview);

      const employee = await EmployeeModel.findById(newReview.empDBId);

      console.log(employee);
      var newPoints = employee.points;

      if (newReview.type === "Positive") {
        newPoints += 5;
        if (newPoints > 100) {
          newPoints = 100;
        }
      } else if (newReview.type === "Negative") {
        newPoints -= 5;
        if (newPoints < 0) {
          newPoints = 0;
        }
      }
      employee.points = newPoints;
      console.log(employee);

      const newEmployee = await employee.save();

      console.log(newEmployee);

      res.status(201).json(newReview);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Controller to get employee reviews by empDBId
  async getEmpReviewByEmpDBId(req, res) {
    try {
      const { empDBId } = req.params;
      const reviews = await EmpReview.find({ empDBId });
      res.status(200).json(reviews);
    } catch (error) {
      res.status(404).json({ message: "Reviews not found" });
    }
  }

  // Controller to update an employee review by ID
  async updateEmpReviewById(req, res) {
    try {
      const { id } = req.params;
      const updatedReview = await EmpReview.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(404).json({ message: "Review not found" });
    }
  }

  // Controller to delete an employee review by ID
  async deleteEmpReviewById(req, res) {
    try {
      const { id } = req.params;
      const deletedReview = await EmpReview.findByIdAndDelete(id);

      //employee part
      const employee = await EmployeeModel.findById(deletedReview.empDBId);

      console.log(employee);
      var newPoints = employee.points;

      if (deletedReview.type === "Positive") {
        newPoints -= 5;
        if (newPoints < 0) {
          newPoints = 0;
        }
      } else if (deletedReview.type === "Negative") {
        // Changed from newReview.type to deletedReview.type
        newPoints += 5;
        if (newPoints > 100) {
          newPoints = 100;
        }
      }
      employee.points = newPoints;
      console.log(employee);

      const newEmployee = await employee.save();

      console.log(newEmployee);

      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: "Review not found" });
    }
  }

  // Controller to get all employee reviews
  async getEmpReviews(req, res) {
    try {
      const reviews = await EmpReview.find();
      res.status(200).json(reviews); // Set the HTTP status code to 200 explicitly
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new EmpReviewController();

const EmpReview = require("../../models/hr/empReviewModel");

class EmpReviewController {
  // Controller to create a new employee review
  async createEmpReview(req, res) {
    try {
      console.log(req.body);
      const newReview = await EmpReview.create(req.body);
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
      await EmpReview.findByIdAndDelete(id);
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

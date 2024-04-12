const mongoose = require("mongoose");

const empReviewSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
  },
  empDBId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Positive", "Negative"],
  },
  review: {
    type: String,
    required: true,
  },
});

const EmpReview = mongoose.model("EmpReview", empReviewSchema);

module.exports = EmpReview;

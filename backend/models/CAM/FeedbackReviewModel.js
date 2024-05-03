const mongoose = require("mongoose");

const feedbackReviewSchema = new mongoose.Schema({
    reviewId :{
        type: String,
        required: true,
    },
    feedbackReview: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
});

const FeedbackReview = mongoose.model("Review", feedbackReviewSchema);

module.exports = FeedbackReview;
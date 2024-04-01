const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        enum: [
            "Periodical Services",
            "Mechanical Repairs",
            "Mobile Services",
            "Emergency Breakdowns",
            "Other",
        ],
    },
    files:[
        {
            type: String,
    },
    ],
    feedback: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
    },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
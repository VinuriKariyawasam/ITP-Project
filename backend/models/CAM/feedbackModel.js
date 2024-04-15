const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
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
    employee: {
        type: String,
        enum: [
            "Emp1",
            "Emp2",
            "Emp3",
            "Emp4",
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
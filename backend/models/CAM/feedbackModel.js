const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    userId :{
        type: String,
        required: true,
    },
    name :{
        type: String,
        required: true,  
    },
    feedbackId :{
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
    employee: {
        type: String,
        enum: [
            "OnSite Technician",
            "Mobile Service Technician",
            "Service Manager",
            "Supervisor",
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
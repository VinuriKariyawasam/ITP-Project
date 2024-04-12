const mongoose = require('mongoose');

// Define schema for EmpBenefits
const empBenefitsSchema = new mongoose.Schema({
    employeeid: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    updatedDate: {
        type: String,
    },
    epftotal: {
        type: Number,
        default: 0
    },
    etftotal: {
        type: Number,
        default: 0
    }
});

// Create and export model
const EmpBenefits = mongoose.model('EmpBenefits', empBenefitsSchema);
module.exports = EmpBenefits;

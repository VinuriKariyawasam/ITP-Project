// models/ServiceReport.js

const mongoose = require('mongoose');

const serviceReportSchema = new mongoose.Schema({
  serviceReportId: { type: String, required: true, unique: true },
  vehicleNumber: { type: String, required: true },
  selectedStartDate: { type: Date, required: true },
  selectedEndDate: { type: Date, required: true },
  selectedTestDate: { type: Date },
  services: [
    {
      name: { type: String, required: true },
      completed: { type: Boolean, default: false },
      price: { type: Number },
    },
  ],
  inventoryUsed: { type: Boolean, default: false },
  borrowedItems: { type: String },
  inventoryTotalPrice: { type: Number },
  testRunDone: { type: Boolean, default: false },
  testRunDetails: { type: String },
  totalServicePrice: { type: Number, required: true },
  serviceDoneTechnicianId: { type: String },
  testDoneTechnicianId: { type: String },
  FinanceApproval:{type:Boolean ,default:false},
});

module.exports = mongoose.model('ServiceReport', serviceReportSchema);

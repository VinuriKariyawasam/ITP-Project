const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billingSchema = new Schema({
  serviceRecordId: { type: String, required: true },
  paymentInvoiceId: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  partsPrice: { type: Number, required: true },
  partsDiscount: { type: Number },
  servicePrice: { type: Number, required: true },
  serviceDiscount: { type: Number},
  taxRate: { type: Number },
  total: { type: Number, required: true },
  currentDate: { type: String },
  currentTime: { type: String },
  status: { type: String, default: 'pending' } // Added status field with default value
});

const Billing = mongoose.model('Bill', billingSchema);

module.exports = Billing;

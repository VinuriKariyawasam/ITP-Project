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
  partsDiscount: { type: Number, required: true },
  servicePrice: { type: Number, required: true },
  serviceDiscount: { type: Number, required: true },
  taxRate: { type: Number, required: true },
  total: { type: Number, required: true },
  currentDate: { type: String},
  currentTime: { type: String}
});

const Billing = mongoose.model('Bill', billingSchema);

module.exports = Billing;

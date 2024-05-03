const { StringFormat } = require('firebase/storage');
const mongoose = require('mongoose');

const paymentHistorySchema = new mongoose.Schema({
  invoice_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: String
  },
  url:{
    type:String
  },
  
});

const PaymentHistory = mongoose.model('PaymentHistory', paymentHistorySchema);

module.exports = PaymentHistory;

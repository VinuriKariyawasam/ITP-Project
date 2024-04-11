const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  vnumber: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  services: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  otherDetails: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;

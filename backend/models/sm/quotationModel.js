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
  borrowingItems: {
    type: String, // Assuming borrowingItems is a single string value
    required: false, // Set to true if borrowingItems is required
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;

const mongoose = require('mongoose');

// Define the schema for the InPersonRecordModel
const inPersonRecordSchema = new mongoose.Schema({
    paymentInvoiceId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
       
    },
    amount: {
        type: Number,
        required: true
    },
    downloadURL: {
        type: String,
        required: true
    }
});

// Create the InPersonRecordModel based on the schema
const InPersonRecordModel = mongoose.model('InPersonRecord', inPersonRecordSchema);

module.exports = InPersonRecordModel;

const mongoose = require('mongoose');


const onlineRecordSchema = new mongoose.Schema({
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


const OnlineRecordModel = mongoose.model('OnlineRecord', onlineRecordSchema);

module.exports = OnlineRecordModel;

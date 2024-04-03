// models/OnlinePayment.js

const mongoose = require('mongoose');

const onlinePaymentSchema = new mongoose.Schema({
    merchant_id: {
        type: String,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },
    payment_id: {
        type: String,
        required: true
    },
    payhere_amount: {
        type: Number,
        required: true
    },
    payhere_currency: {
        type: String,
        required: true
    },
    status_code: {
        type: Number,
        required: true
    },
    custom_1: String,
    custom_2: String,
    method: {
        type: String,
        required: true
    },
    status_message: String,
    card_holder_name: String,
    card_no: String,
    card_expiry: String,
    sv:Boolean,
    created_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('OnlinePayment', onlinePaymentSchema);




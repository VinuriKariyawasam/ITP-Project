const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    products: [{
        product_name: {
            type: String,
            required: true
        },
        unit_price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    status:{
        type:String,
        required: true
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const cartSchema = new schema({
    Product_name: {
        type: String,
        required: true
    },
    Unit_price: {
        type: Number,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    image:{
        type: String,
    },

})

const cart = mongoose.model("cart", cartSchema);


module.exports = cart;

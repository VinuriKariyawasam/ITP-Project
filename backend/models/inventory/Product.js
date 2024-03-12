const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ProductSchema = new schema({
    Product_name: {
        type: String,
        required: true
    },
    Product_code: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Unit_price: {
        type: String,
        required: true
    },
   
})

const Product = mongoose.model("Product", ProductSchema);


module.exports = Product;

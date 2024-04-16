const mongoose = require("mongoose");

const schema = mongoose.Schema;

const QuantitySchema = new schema({
    Product_name: {
        type: String,
        required: true
    },
    Product_type: {
        type: String,
        required: true
    },
})

const Quantity = mongoose.model("Quantity", QuantitySchema);


module.exports = Quantity;

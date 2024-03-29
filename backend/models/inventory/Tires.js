const mongoose = require("mongoose");

const schema = mongoose.Schema;

const TireSchema = new schema({
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

const Tires = mongoose.model("Tires", TireSchema);


module.exports = Tires;
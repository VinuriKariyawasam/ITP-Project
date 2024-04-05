const mongoose = require("mongoose");

const schema = mongoose.Schema;

const LubricantSchema = new schema({
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
    image:{
        type: String,
    },

})

const Lubricant = mongoose.model("Lubricant", LubricantSchema);


module.exports = Lubricant;

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const TireSchema = new schema({
    Product_name: {
        type: String,
        required: true
    },
    Product_Brand: {
        type: String,
        required: true
    },
    vehicle_Type:{
        type: String,
        required:true
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

const Tires = mongoose.model("Tires", TireSchema);


module.exports = Tires;
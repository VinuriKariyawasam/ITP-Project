const mongoose = require("mongoose");

const schema = mongoose.Schema;

const spSchema = new schema({
    name: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    }, 
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },

})

const sp = mongoose.model("SpareParts", spSchema);


module.exports = sp;

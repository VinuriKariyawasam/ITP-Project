const mongoose = require("mongoose");

const schema = mongoose.Schema;

const aspSchema = new schema({
    id:{
        type:String,
        required: true
    },
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
        required:true
    },
    status:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },total:{
        type:Number,
        required: true
    }

})

const asp = mongoose.model("ApprovedSpareParts", aspSchema);


module.exports = asp;

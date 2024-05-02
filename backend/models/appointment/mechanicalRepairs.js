const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mechanicalSchema = new Schema({
    userId:{
        type :String,
        required:true,
    }, 

    name: {
        type :String,
        required: true
    },
    email: {
        type: String,
        required: true,
      },
    cusType:{
        type :String,
        required: true
    },
    vType: {
        type :String,
        required: true
    },
    vNo: {
        type: String,
        required: true,
    },
    issue: {
        type: String,
        required: true,
    },
    contactNo:{
        type:Number,
        required:true,
        maxLength: 10,
    },
    appointmentdate: {
        type: Date,
        required: true,
    },
    appointmenttime: {
        type: String,
        required: true,
    }

    
})
const mechanicalRepairs = mongoose.model("mechanicalRepairs",mechanicalSchema);

module.exports=mechanicalRepairs;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const acceptedaccidentalSchema = new Schema({

    name: {
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
    dateAccidentaOccured: {
        type: String,
        required: true,
    },
    damagedOccured: {
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
const acceptedaccidentalRepairs = mongoose.model("acceptedaccidentalRepairAppointments",acceptedaccidentalSchema);

module.exports=acceptedaccidentalRepairs;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const acceptedmechanicalSchema = new Schema({
    userId:{
        type :String,
    }, 

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
const acceptedmechanical = mongoose.model("acceptedmechanicalAppointments",acceptedmechanicalSchema);

module.exports=acceptedmechanical;
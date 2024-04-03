//To connect with mongoDB
const mongoose = require("mongoose");

//Inside a schema we declare attributes
const schema = mongoose.Schema;
const acceptedappointmentSchema = new schema({
    name: {
        type: String,
        required: true,
        
    },
    vType: {
        type: String,
        required: true,
        
    },
    vNo: {
        type: String,
        required: true,
        
    },
    sType: {
        type: String,
        required: true,
    },
    issue:{
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
        maxLength: 10,
    },
    appointmentdate: {
        type: String,
        required: true,
    },
    appointmenttime: {
        type: String,
        required: true,
    }
   
});

//To pass this schema to a cluster in Mongo DB
const acceptedappointment = mongoose.model("acceptedappointment", acceptedappointmentSchema);

module.exports = acceptedappointment;

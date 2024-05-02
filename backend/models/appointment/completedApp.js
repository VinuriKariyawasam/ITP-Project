//To connect with mongoDB
const mongoose = require("mongoose");

//Inside a schema we declare attributes
const schema = mongoose.Schema;
const completedappointmentSchema = new schema({
    userId:{
        type :String,
    }, 
    name: {
        type: String,
        required: true,
        
    },
    cusType:{
        type :String,
        required: true
    },
    vType: {
        type: String,
        required: true,
        
    },
    vNo: {
        type: String,
        required: true,
        
    },
    serviceType: {
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
        type: Date,
        required: true,
    },
    appointmenttime: {
        type: String,
        required: true,
    }
   
});

//To pass this schema to a cluster in Mongo DB
const completedappointment = mongoose.model("completedappointment", completedappointmentSchema);

module.exports = completedappointment;

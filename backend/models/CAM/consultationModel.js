const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({

    

    consultationId :{
        type : String,
        required : true,
    },
    vehicleType :{
        type : String,
        required : true,
    },
    component :{
        type : String,
        required : true,
    },
    issue :{
        type : String,
        required : true,
        maxLength : 255,
    },
    solution :{
        type : String,
        maxLength : 255,
    },
    files:[
        {
            type: String,
    },
    ],
});

const Consultation = mongoose.model("consultation",consultationSchema);

module.exports = Consultation;
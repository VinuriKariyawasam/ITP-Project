const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accidentalSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    vType: {
        type: String,
        required: true
    },
    vNo: {
        type: String,
        required: true,
    },
    dateAccidentaOccured: {
        type: Date,
        required: true,
    },
    damagedOccured: {
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
    },
    image:{
        type: String,
    
    },


})
const accidentalRepairs = mongoose.model("accidentalRepairs", accidentalSchema);

module.exports = accidentalRepairs;
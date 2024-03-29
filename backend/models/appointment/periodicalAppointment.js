
const mongoose = require("mongoose");

const schema = mongoose.Schema;
const periodicalSchema = new schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    vType: {
        type: String,
        required: true,
        maxLength: 20
    },
    vNo: {
        type: String,
        required: true,
        maxLength: 15
    },
    sType: {
        type: String,
        required: true,
    },
    lastServiceYear: {
        type: String,
        required: true,
    },
    lastServiceMonth: {
        type: String,
        required: true,
    },
    mileage: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
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
    },
    msg: {
        type: String,
        maxLength: 255
    }
});

const periodicalAppointment = mongoose.model("PeiodicalAppointment", periodicalSchema);

module.exports = periodicalAppointment;

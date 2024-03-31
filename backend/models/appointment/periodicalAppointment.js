//To connect with mongoDB
const mongoose = require("mongoose");

//Inside a schema we declare attributes
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
        maxLength: 6
    },
    lastServiceMonth: {
        type: String,
        required: true,
    },
    mileage: {
        type: String,
        required: true,
        maxLength: 20,
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

//To pass this schema to a cluster in Mongo DB
const periodicalAppointment = mongoose.model("PeiodicalAppointment", periodicalSchema);

module.exports = periodicalAppointment;

//To connect with mongoDB
const mongoose = require("mongoose");

//Inside a schema we declare attributes
const schema = mongoose.Schema;
const acceptedperiodicalSchema = new schema({
  userId:{
    type :String,
}, 
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
  lastServiceYear: {
    type: Number,
    required: true,
    maxLength: 5,
  },
  lastServiceMonth: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
    maxLength: 20,
  },
  phone: {
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
  msg: {
    type: String,
  },
});

//To pass this schema to a cluster in Mongo DB
const acceptedPeriodical = mongoose.model(
  "AcceptedPeriodicalAppointment",
  acceptedperiodicalSchema
);

module.exports = acceptedPeriodical;
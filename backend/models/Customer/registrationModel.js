const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({

    cusId :{
        type : String,
    },
    Name :{
        type: String,
        required: true,
    },
    contact :{
        type: String,
        required: true,  
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
});

const Customer = mongoose.model("Customer",registrationSchema);
module.exports = Customer;
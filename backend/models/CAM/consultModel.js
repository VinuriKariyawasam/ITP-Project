const mongoose = require('mongoose');

const consultSchema = new mongoose.Schema({

    reply :{
        type : String,
        required : true,
        maxLength : 255
    }

})

const consult = mongoose.model("Reply",consultSchema);
module.exports = consult;
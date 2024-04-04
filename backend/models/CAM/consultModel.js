const mongoose = require('mongoose');

const consultSchema = new mongoose.Schema({

    reply :{
        type : String,
        required : true,
        maxLength : 255
    }

})

module.exports = mongoose.model("question",consultSchema);

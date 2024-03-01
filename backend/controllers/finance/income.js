const { config } = require("dotenv")

exports.addIncome = async (req,res)=>{
    console.log(req.body)
    res.send(req.body)
}
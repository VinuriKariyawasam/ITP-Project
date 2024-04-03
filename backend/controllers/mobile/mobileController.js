const { config } = require("dotenv")
const MobileSchema = require("../../models/mobile/mobileModel")

exports.addmechanicalreqdata = async (req,res)=>{
    const {cusName,cusEmail,vehicleNo,reqDate,reqTime,reqLocation,issue,contactNo}= req.body


    const mobileS=MobileSchema({
        cusName,
		cusEmail,
		vehicleNo,
		reqDate,
		reqTime,
		reqLocation,
		issue,
		contactNo
    })
    try {
        if(!cusName||!cusEmail||!vehicleNo||!reqDate||!reqTime||!reqLocation||!issue||!contactNo){
            return res.status(400).json({message:'All Fields Required'})
        }
        await mobileS.save()
         res.status(200).json({message:'Mobile service added to DB'})
    } catch (error) {
        
    }
}

exports.getMechanical = async (req,res)=>{
    try {
        const mobile= await MobileSchema.find().sort({createdAt:-1})
        res.status(200).json(mobile)
    } catch (error) {
        res.status(500).json({message :'Server Error'})
    }
}

exports.deleteMechanical = async (req,res)=>{
    const {id}= req.params;
    MobileSchema.findByIdAndDelete(id).then((expense)=>{
        res.status(200).json({message :'Expense Deleted Sucessfully'})
    }).catch((error)=>{
        res.status(500).json({message :'Server Error'})
    })
} 
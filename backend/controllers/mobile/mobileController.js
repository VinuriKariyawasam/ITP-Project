const { config } = require("dotenv")
const MobileSchema = require("../../models/mobile/mobileModel")

exports.addmechanicalreqdata = async (req,res)=>{
    const {cusName,cusEmail,vehicleNo,reqDate,reqTime,reqLocation,issue,contactNo}= req.body



    const mobileS= new MobileSchema({
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
        return res.status(200).json({message:'Mobile request added to DB'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getMechanical = async (req,res)=>{
    MobileSchema.find().then((mobile)=>{
        res.status(200).json(mobile)
    }) .catch ((error)=>{
        res.status(500).json({message :'Server Error'})
    })
}


exports.deleteMechanical = async (req,res)=>{
    const {id}= req.params;
    MobileSchema.findByIdAndDelete(id).then((mobile)=>{
        res.status(200).json({message :'Request Deleted Sucessfully'})
    }).catch((error)=>{
        res.status(500).json({message :'Server Error'})
    })
} 

exports.updatemechanical = async (req, res) => {
    const { id } = req.params;
    const {technician}= req.body

    try {
        if(!technician){
            return res.status(400).json({message:'Technician is Required'})
        }
        const mechUpdate = await MobileSchema.findById(id);
        if (!mechUpdate) {
            return res.status(404).json({ message: 'Mechanical Request not found' });
        }
        mechUpdate.technician = technician;

     await mechUpdate.save();
        res.status(200).json({ message: 'Request Updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
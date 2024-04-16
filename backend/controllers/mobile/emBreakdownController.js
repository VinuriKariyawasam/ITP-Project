const { config } = require("dotenv")
const BreakdownRequestsSchema = require("../../models/mobile/EmBreakdownModel")

exports.addbreakdownreqdata = async (req,res)=>{
    const {cusName,cusEmail,vehicleNo,reqLocation,issue,contactNo}= req.body



    const emBreakdown= new BreakdownRequestsSchema({
        cusName,
		cusEmail,
		vehicleNo,
		reqLocation,
		issue,
		contactNo
    })
    try {
        if(!cusName||!cusEmail||!vehicleNo||!reqLocation||!issue||!contactNo){
            return res.status(400).json({message:'All Fields Required'})
        }
        await emBreakdown.save()
        return res.status(200).json({message:'Breakdown request added to DB'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getbreakdownreq = async (req,res)=>{
    BreakdownRequestsSchema.find().then((mobile)=>{
        res.status(200).json(mobile)
    }) .catch ((error)=>{
        res.status(500).json({message :'Server Error'})
    })
}


exports.deletebreakdownreq = async (req,res)=>{
    const {id}= req.params;
    BreakdownRequestsSchema.findByIdAndDelete(id).then((mobile)=>{
        res.status(200).json({message :'Request Deleted Sucessfully'})
    }).catch((error)=>{
        res.status(500).json({message :'Server Error'})
    })
} 

exports.updatebreakdownreq = async (req, res) => {
    const { id } = req.params;
    const {technician}= req.body

    try {
        if(!technician){
            return res.status(400).json({message:'Technician is Required'})
        }
        const breakdUpdate = await BreakdownRequestsSchema.findById(id);
        if (!breakdUpdate) {
            return res.status(404).json({ message: 'Breakdown Request not found' });
        }
        breakdUpdate.technician = technician;

     await breakdUpdate.save();
        res.status(200).json({ message: 'Request Updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
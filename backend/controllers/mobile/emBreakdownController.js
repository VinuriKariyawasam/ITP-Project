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
    const {cusName,cusEmail,vehicleNo,reqLocation,issue,contactNo}= req.body

    try {
        if(!cusName||!cusEmail||!vehicleNo||!reqLocation||!issue||!contactNo){
            return res.status(400).json({message:'All Fields Required'})
        }

        breakdUpdate.cusName = cusName;
        breakdUpdate.cusEmail = cusEmail;
        breakdUpdate.vehicleNo = vehicleNo;
        breakdUpdate.reqLocation = reqLocation;
        breakdUpdate.issue = issue;
        breakdUpdate.contactNo = contactNo;

        await breakdUpdate.save();
        res.status(200).json({ message: 'Request Updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}
const { config } = require("dotenv")
const CarrierRequestsSchema = require("../../models/mobile/vehicleCarrierModel")

exports.addcarrierreqdata = async (req,res)=>{
    const {cusName,cusEmail,vehicleNo,reqDate,reqTime,reqLocation,additionalInfo,contactNo}= req.body



    const vehiCarrier= new CarrierRequestsSchema({
        cusName,
		cusEmail,
		vehicleNo,
		reqDate,
		reqTime,
		reqLocation,
		additionalInfo,
		contactNo
    })
    try {
        if(!cusName||!cusEmail||!vehicleNo||!reqDate||!reqTime||!reqLocation||!additionalInfo||!contactNo){
            return res.status(400).json({message:'All Fields Required'})
        }
        await vehiCarrier.save()
        return res.status(200).json({message:'Vehicle carrier request added to DB'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getcarrierreq = async (req,res)=>{
    CarrierRequestsSchema.find().then((mobile)=>{
        res.status(200).json(mobile)
    }) .catch ((error)=>{
        res.status(500).json({message :'Server Error'})
    })
}


exports.deletecarrierreq = async (req,res)=>{
    const {id}= req.params;
    CarrierRequestsSchema.findByIdAndDelete(id).then((mobile)=>{
        res.status(200).json({message :'Request Deleted Sucessfully'})
    }).catch((error)=>{
        res.status(500).json({message :'Server Error'})
    })
} 

exports.updatecarrierreq = async (req, res) => {
    const { id } = req.params;
    const {cusName,cusEmail,vehicleNo,reqDate,reqTime,reqLocation,additionalInfo,contactNo}= req.body

    try {
        if(!cusName||!cusEmail||!vehicleNo||!reqDate||!reqTime||!reqLocation||!additionalInfo||!contactNo){
            return res.status(400).json({message:'All Fields Required'})
        }

        carrUpdate.cusName = cusName;
        carrUpdate.cusEmail = cusEmail;
        carrUpdate.vehicleNo = vehicleNo;
        carrUpdate.reqDate = reqDate;
        carrUpdate.reqTime = reqTime;
        carrUpdate.reqLocation = reqLocation;
        carrUpdate.additionalInfo = additionalInfo;
        carrUpdate.contactNo = contactNo;

        await carrUpdate.save();
        res.status(200).json({ message: 'Request Updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}
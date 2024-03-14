const router = require("express").Router();
let periodicalSchema = require("../models/appointment/periodicalAppointment");


router.route("/addPeriodicalData").post((req, res) => {

    const name = req.body.name;
    const vType = req.body.vType;
    const vNo = req.body.vNo;
    const sType = req.body.sType;
    const lastServiceYear =req.body.lastServiceYear;
    const lastServiceMonth = req.body.lastServiceMonth;
    const mileage = req.body.mileage;
    const phone = req.body.phone;
    const appointmentdate=req.body.appointmentdate;
    const appointmenttime=req.body.appointmenttime;
    const msg=req.body.msg;


    const newPeriodicalAppointment = new periodicalSchema ({
        name,
        vType,
        vNo,
        sType,
        lastServiceYear,
        lastServiceMonth,
        mileage,
        phone,
        appointmentdate,
        appointmenttime,
        msg,

    
    })

    newPeriodicalAppointment.save().then(() => {
        res.json("Appointment added");
    }).catch((err) => {
        console.log(err);
    })

})


router.route("/find").get((req,res)=>{
    periodicalSchema .find().then((periodicalAppointments)=>{
        res.json(periodicalAppointments)
    }).catch((err)=>{
        console.log(err)
    })
})




router.route("/UpdatePeriodicalData").put(async(req, res) => {

exports.updateperiodicalAppointment = async (req,res)=>{
    let periodicalappointmentId =req.params.id;
    //to get existing values
    const {name,vType,vNo,sType,lastServiceYear,lastServiceMonth,mileage,phone,appointmentdate,appointmenttime,mag}= req.body
    
    //object to store new values
    const updatePeriodicalAppointment ={
     name,
     vType,
     vNo,
     sType,
     lastServiceYear,
     lastServiceMonth,
     mileage,
     phone,
     appointmentdate,
     appointmenttime,
     msg,
 
 
    }
 
    //to find relavant apoointment to update
    const update = await periodicalSchema.findByIdAndUpdate(periodicalappointmentId,updatePeriodicalAppointment).then(()=>{
     res.status(200).send({status:"Updated",appointment:update})
    }).catch((err)=>{
     res.status(500).send({status:"server error with update data",error:err.message});
    })
}
 })
 module.exports = router;
 
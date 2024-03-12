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


module.exports = router;

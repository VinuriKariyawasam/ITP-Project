const { config } = require("dotenv")
const periodicalSchema  = require("../../models/appointment/periodicalAppointment")


exports.addperiodicalAppointment = async(req,res)=>{
    // get data from fronend in request body to backend
    const {name ,vType,vNo,sType,lastServiceYear,lastServiceMonth,mileage,phone,appointmentdate,appointmenttime,msg}= req.body


    const newPeriodicalAppointment= periodicalSchema ({
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

    try {
        if(!name||!vType||!vNo||!sType||!lastServiceYear||!lastServiceMonth||!mileage||!phone||!appointmentdate||!appointmenttime||!msg){
            return res.status(400).json({message:'All Fields Required'})
        }      
        await newPeriodicalAppointment.save()
         res.status(200).json({message:'NewAppointment added to DB'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


   /* newPeriodicalAppointment.save().then(()=>{
        res.json(" new Periodical Appointment added")
    }).catch((err)=>{
        console.log(err);
    })
}*/

exports.getperiodicalAppointment = async (req,res)=>{
    periodicalSchema .find().then((periodicalAppointments)=>{
        res.json(periodicalAppointments)
    }).catch((err)=>{
        console.log(err)
    })

}

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
     res.status(200).send({status:"Updated"})
    }).catch((err)=>{
     res.status(500).send({status:"server error with update data",error:err.message});
    })
   
 }
 exports.deleteperiodicalAppointment = async (req,res)=>{
     const {id}= req.params;
     periodicalSchema.findByIdAndDelete(id).then((periodicalAppointments)=>{
         res.status(200).json({message :'periodicalAppointment Deleted Sucessfully'})
     }).catch((error)=>{
         res.status(500).json({message :'Server Error'})
     })
 } 
 
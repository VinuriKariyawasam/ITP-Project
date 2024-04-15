const { config } = require("dotenv")
const periodicalSchema = require("../../models/appointment/periodicalAppointment")


exports.addperiodicalAppointment = async (req, res) => {
    // get data from frontend via request body to backend
    const userId = req.body.userId;
    const name = req.body.name;
    const vType = req.body.vType;
    const vNo = req.body.vNo;
    const sType = req.body.sType;
    const lastServiceYear =req.body.lastServiceYear;
    const lastServiceMonth = req.body.lastServiceMonth;
    const mileage = Number(req.body.mileage);
    const phone = Number(req.body.phone);
    const appointmentdate =new  Date(req.body.appointmentdate);
    const appointmenttime = req.body.appointmenttime;
    const msg = req.body.msg;

    
    const newPeriodicalAppointment = periodicalSchema({
        userId,
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
    });

    try {
        if (!userId||!name || !vType || !vNo || !sType || !lastServiceYear || !lastServiceMonth || !mileage || !phone || !appointmentdate || !appointmenttime || !msg) {
            return res.status(400).json({ message: 'All Fields Required' })
       }
        await newPeriodicalAppointment.save()
        res.status(200).json({ message: 'NewAppointment added to DB' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


/* newPeriodicalAppointment.save().then(()=>{
     res.json(" new Periodical Appointment added")
 }).catch((err)=>{
     console.log(err);
 })
}*/

exports.getperiodicalAppointment = async (req, res) => {
    periodicalSchema.find().then((periodicalAppointments) => {
        res.json(periodicalAppointments)
    }).catch((err) => {
        console.log(err)
    })

}

exports.updateperiodicalAppointment = async (req, res) => {
    const { id } = req.params;
    //to get existing values
    //destructure method - get all values send throught frontend in once
    const {userId, name, vType, vNo, sType, lastServiceYear, lastServiceMonth, mileage, phone, appointmentdate, appointmenttime, msg } = req.body
    
    //object to store new values
    const updatePeriodicalAppointment= {
        userId,
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

    // find relavant apoointment Id and update
    const update = await periodicalSchema.findByIdAndUpdate(id,updatePeriodicalAppointment).then(() => {
        res.status(200).send({ status: "Updated"})
    }).catch((err) => {
        res.status(500).send({ status: "server error with update data", error: err.message });
    })

}
/*  try {
        
        const existingAppointment = await  periodicalSchema.findById(id);
        if (!existingAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
 
        if ( name) existingAppointment. name =  name;
        if (vType) existingAppointment.vType = vType;
        if (vNo) existingAppointment.vNo = vNo;
        if (sType) existingAppointment.sType = sType;
        if (lastServiceYear) existingAppointment.lastServiceYear = lastServiceYear;
        if (lastServiceMonth) existingAppointment.lastServiceMonth = lastServiceMonth;
        if (mileage) existingAppointment.mileage = mileage;
        if (phone) existingAppointment.phone = phone;
        if (appointmentdate) existingAppointment.appointmentdate = appointmentdate;
        if (appointmenttime) existingAppointment.appointmenttime= appointmenttime;
        if (msg) existingAppointment.msg = msg;

       
        await existingAppointment.save();

        res.status(200).json({ message: 'Appointment updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}*/
exports.deleteperiodicalAppointment = async (req, res) => {
    const { id } = req.params;
    periodicalSchema.findByIdAndDelete(id).then((periodicalAppointments) => {
        res.status(200).json({ message: 'periodicalAppointment Deleted Sucessfully' })
    }).catch((error) => {
        res.status(500).json({ message: 'Server Error' })
    })
}

exports.getOneperiodicalAppointment = async (req,res)=>{
    const {id}= req.params;
    try {
    const perodicalAppointment = await periodicalSchema.findById(id);
        if (perodicalAppointment) {
            res.status(200).send({ status: "User fetched", data: perodicalAppointment });
        } else {
            res.status(404).send({ status: "User not found" });
        }
    } catch(err) {
        res.status(500).send({ status: "Error with getting user", error: err.message });
    }
} 
exports.getOneperiodicalAppointmentbyVno = async (req, res) => {
    const { vNo } = req.params;
    try {
        const periodicalAppointment = await periodicalSchema.findOne({ vNo: vNo });
        if (periodicalAppointment) {
            res.status(200).send({ status: "User fetched", data: periodicalAppointment });
        } else {
            res.status(404).send({ status: "User not found" });
        }
    } catch (err) {
        res.status(500).send({ status: "Error with getting user", error: err.message });
    }
}
exports.getperiodicalAppointmentbyuserId= async (req, res) => {
    const { userId } = req.params;
    try {
        const periodicalAppointment = await periodicalSchema.find({ userId: userId });
        if (periodicalAppointment) {
            res.status(200).send({ status: "User fetched", data: periodicalAppointment });
        } else {
            res.status(404).send({ status: "User not found" });
        }
    } catch (err) {
        res.status(500).send({ status: "Error with getting user", error: err.message });
    }
}
const { config } = require("dotenv")
const acceptedappointmentSchema= require("../../models/appointment/acceptedappointment")


exports.addacceptedappointment = async (req, res) => {
    // get data from fronend in request body to backend
    const userId = req.body.userId;
    const name = req.body.name;
    const vType = req.body.vType;
    const vNo = req.body.vNo;
    const serviceType = req.body.serviceType;
    const issue = req.body.issue;
    const contactNo = Number(req.body.contactNo);
    const appointmentdate =new Date(req.body.appointmentdate);
    const appointmenttime = req.body.appointmenttime;
    

    const newacceptedappointment = acceptedappointmentSchema({
        userId,
        name,
        vType,
        vNo,
        serviceType,
        issue,
        contactNo,
        appointmentdate,
        appointmenttime,
    });

    try {
        if (!name || !vType || !vNo || !serviceType || !issue ||  !contactNo || !appointmentdate || !appointmenttime ) {
            return res.status(400).json({ message: 'All Fields Required' })
        }
        await newacceptedappointment.save()
        res.status(200).json({ message: 'NewAppointment added to DB' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


/* newacceptedappointment.save().then(()=>{
     res.json(" new Periodical Appointment added")
 }).catch((err)=>{
     console.log(err);
 })
}*/

exports.getacceptedappointment = async (req, res) => {
    acceptedappointmentSchema.find().then((acceptedappointment) => {
        res.json(acceptedappointment)
    }).catch((err) => {
        console.log(err)
    })

}

exports.updateacceptedappointment= async (req, res) => {
    let acceptedappointmentId = req.params.id;
    //to get existing values
    const {userId, name, vType, vNo,serviceType,issue, contactNo, appointmentdate, appointmenttime } = req.body

    
    //object to store new values
    const updateacceptedappointment = {
        userId,
        name,
        vType,
        vNo,
        serviceType,
        issue,
        contactNo,
        appointmentdate,
        appointmenttime,
    }
    
    //to find relavant apoointment to update
    const update = await  acceptedappointmentSchema.findByIdAndUpdate(acceptedappointmentId, updateacceptedappointment).then(() => {
        res.status(200).send({ status: "Updated"})
    }).catch((err) => {
        res.status(500).send({ status: "server error with update data", error: err.message });
    })

}
exports.deleteacceptedappointment = async (req, res) => {
    const { id } = req.params;
    acceptedappointmentSchema.findByIdAndDelete(id).then((acceptedappointment) => {
        res.status(200).json({ message: 'Mechanical Appointment Deleted Sucessfully' })
    }).catch((error) => {
        res.status(500).json({ message: 'Server Error' })
    })
}
exports.getOneacceptedappointment = async (req,res)=>{
    const {id}= req.params;
    try {
    const acceptedappointment = await acceptedappointmentSchema.findById(id);
    if (acceptedappointment) {
        res.status(200).send({ status: "User fetched", data: acceptedappointment });
    } else {
        res.status(404).send({ status: "User not found" });
    }
} catch(err) {
    res.status(500).send({ status: "Error with getting user", error: err.message });
}
}

exports.getOneacceptedappointmentbyVno = async (req, res) => {
    const { vNo } = req.params;
    try {
        const acceptedappointment = await acceptedappointmentSchema.findOne({ vNo: vNo });
        if (acceptedappointment) {
            res.status(200).send({ status: "User fetched", data: acceptedappointment });
        } else {
            res.status(404).send({ status: "User not found" });
        }
    } catch (err) {
        res.status(500).send({ status: "Error with getting user", error: err.message });
    }
}


exports.getacceptedappointmentbyDate = async (req, res) => {
    
        const { appointmentdate } = req.params;
        const startDate = new Date(appointmentdate);
        const endDate = new Date(appointmentdate);
        endDate.setDate(endDate.getDate() + 1); // Increment the date by 1 to get the next day
    
        try {
            const acceptedappointment = await acceptedappointmentSchema.find({
                appointmentdate: { $gte: startDate, $lt: endDate }
            });
    
            if (acceptedappointment.length > 0) {
                res.status(200).send({ status: "User fetched", data: acceptedappointment });
            } else {
                res.status(404).send({ status: "No appointments found for the given date" });
            }
        } catch (err) {
            res.status(500).send({ status: "Error with getting user", error: err.message });
        }
    }
     
    

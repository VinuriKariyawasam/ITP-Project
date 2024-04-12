const { config } = require("dotenv")
const acceptedmechanicalSchema = require("../../models/appointment/acceptedMechanical")


exports.addacceptedmechanicalAppointment= async (req, res) => {
    // get data from fronend in request body to backend
    const userId = req.body.userId;
    const name = req.body.name;
    const vType = req.body.vType;
    const vNo = req.body.vNo;
    const issue = req.body.issue;
    const contactNo = Number(req.body.contactNo);
    const appointmentdate = new Date(req.body.appointmentdate);
    const appointmenttime = req.body.appointmenttime;
    

    const newacceptedmechanicalAppointment= acceptedmechanicalSchema({
        userId,
        name,
        vType,
        vNo,
        issue,
        contactNo,
        appointmentdate,
        appointmenttime,
    });

    try {
        if (!name || !vType || !vNo || !issue ||  !contactNo || !appointmentdate || !appointmenttime ) {
            return res.status(400).json({ message: 'All Fields Required' })
        }
        await newacceptedmechanicalAppointment.save()
        res.status(200).json({ message: ' acceptedAppointment added to DB' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


/* newacceptedmechanicalAppointment.save().then(()=>{
     res.json(" new Periodical Appointment added")
 }).catch((err)=>{
     console.log(err);
 })
}*/

exports.getacceptedmechanicalAppointment= async (req, res) => {
    acceptedmechanicalSchema.find().then((acceptedmechanicalAppointment) => {
        res.json(acceptedmechanicalAppointment)
    }).catch((err) => {
        console.log(err)
    })

}

exports.getacceptedmechanicalappointmentbyDate = async (req, res) => {
    
    const { appointmentdate } = req.params;
    const startDate = new Date(appointmentdate);
    const endDate = new Date(appointmentdate);
    endDate.setDate(endDate.getDate() + 1); // Increment the date by 1 to get the next day

    try {
        const acceptedmechanicalappointment = await acceptedmechanicalSchema.find({
            appointmentdate: { $gte: startDate, $lt: endDate }
        });

        if (acceptedmechanicalappointment.length > 0) {
            res.status(200).send({ status: "User fetched", data: acceptedmechanicalappointment });
        } else {
            res.status(404).send({ status: "No appointments found for the given date" });
        }
    } catch (err) {
        res.status(500).send({ status: "Error with getting user", error: err.message });
    }
}
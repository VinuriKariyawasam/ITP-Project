const { config } = require("dotenv")
const acceptedaccidentalSchema = require("../../models/appointment/acceptedaccidental")


exports.addacceptedaccidentalAppointment= async (req, res) => {
    // get data from fronend in request body to backend
    
    const userId = req.body.userId;
    const name = req.body.name;
    const vType = req.body.vType;
    const vNo = req.body.vNo;
    const dateAccidentaOccured =new Date(req.body.dateAccidentaOccured);
    const damagedOccured = req.body.damagedOccured;
    const contactNo = Number(req.body.contactNo);
    const appointmentdate = new Date(req.body.appointmentdate);
    const appointmenttime = req.body.appointmenttime;
    const image = req.body.image;
    

    const newacceptedaccidentalAppointment= acceptedaccidentalSchema({
        userId,
        name,
        vType,
        vNo,
        dateAccidentaOccured,
        damagedOccured,
        contactNo,
        appointmentdate,
        appointmenttime,
        image
    });

    try {
        if (!name || !vType || !vNo || !dateAccidentaOccured || !damagedOccured|| !contactNo || !appointmentdate || !appointmenttime ||!image) {
            return res.status(400).json({ message: 'All Fields Required' })
        }
        await newacceptedaccidentalAppointment.save()
        res.status(200).json({ message: ' acceptedAppointment added to DB' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


/* newacceptedaccidentalAppointment.save().then(()=>{
     res.json(" new Periodical Appointment added")
 }).catch((err)=>{
     console.log(err);
 })
}*/

exports.getacceptedaccidentalAppointment= async (req, res) => {
    acceptedaccidentalSchema.find().then((acceptedaccidentalAppointment) => {
        res.json(acceptedaccidentalAppointment)
    }).catch((err) => {
        console.log(err)
    })

}
exports.getacceptedaccidentalappointmentbyDate = async (req, res) => {
    
    const { appointmentdate } = req.params;
    const startDate = new Date(appointmentdate);
    const endDate = new Date(appointmentdate);
    endDate.setDate(endDate.getDate() + 1); // Increment the date by 1 to get the next day

    try {
        const acceptedappointmentaccidental = await acceptedaccidentalSchema.find({
            appointmentdate: { $gte: startDate, $lt: endDate }
        });

        if (acceptedappointmentaccidental.length > 0) {
            res.status(200).send({ status: "User fetched", data: acceptedappointmentaccidental });
        } else {
            res.status(404).send({ status: "No appointments found for the given date" });
        }
    } catch (err) {
        res.status(500).send({ status: "Error with getting user", error: err.message });
    }
}
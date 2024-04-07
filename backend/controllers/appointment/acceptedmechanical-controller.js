const { config } = require("dotenv")
const acceptedmechanicalSchema = require("../../models/appointment/acceptedMechanical")


exports.addacceptedmechanicalAppointment= async (req, res) => {
    // get data from fronend in request body to backend

    const name = req.body.name;
    const vType = req.body.vType;
    const vNo = req.body.vNo;
    const issue = req.body.issue;
    const contactNo = Number(req.body.contactNo);
    const appointmentdate = new Date(req.body.appointmentdate);
    const appointmenttime = req.body.appointmenttime;
    

    const newacceptedmechanicalAppointment= acceptedmechanicalSchema({
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
const { config } = require("dotenv")
const acceptedperiodicalSchema = require("../../models/appointment/acceptedPeriodical")


exports.addaceptedperiodicalAppointment = async (req, res) => {
    // get data from frontend via request body to backend

    const name = req.body.name;
    const vType = req.body.vType;
    const vNo = req.body.vNo;
    const sType = req.body.sType;
    const lastServiceYear = Number(req.body.lastServiceYear);
    const lastServiceMonth = req.body.lastServiceMonth;
    const mileage = Number(req.body.mileage);
    const phone = Number(req.body.phone);
    const appointmentdate =new  Date(req.body.appointmentdate);
    const appointmenttime = req.body.appointmenttime;
    const msg = req.body.msg;

    
    const newacceptedPeriodicalAppointment = acceptedperiodicalSchema({
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
        msg
    });

    try {
        if (!name || !vType || !vNo || !sType || !lastServiceYear || !lastServiceMonth || !mileage || !phone || !appointmentdate || !appointmenttime) {
            return res.status(400).json({ message: 'Fill Required Fields' })
        }
        await newacceptedPeriodicalAppointment.save()
        res.status(200).json({ message: 'New AcceptedAppointment added to DB' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


/* newacceptedPeriodicalAppointment.save().then(()=>{
     res.json(" new accepted Appointment added")
 }).catch((err)=>{
     console.log(err);
 })
}*/

exports.getacceptedperiodicalAppointment = async (req, res) => {
    acceptedperiodicalSchema.find().then((acceptedperiodicalAppointments) => {
        res.json(acceptedperiodicalAppointments)
    }).catch((err) => {
        console.log(err)
    })

}

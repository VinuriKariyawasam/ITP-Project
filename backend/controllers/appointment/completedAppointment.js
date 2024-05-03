const { config } = require("dotenv")
const completedappointmentSchema= require("../../models/appointment/completedApp")


exports.addcompletedappointment = async (req, res) => {
    // get data from fronend in request body to backend
    const userId = req.body.userId;
    const name = req.body.name;
    const cusType = req.body.cusType;
    const vType = req.body.vType;
    const vNo = req.body.vNo;
    const serviceType = req.body.serviceType;
    const issue = req.body.issue;
    const contactNo = Number(req.body.contactNo);
    const appointmentdate =new Date(req.body.appointmentdate);
    const appointmenttime = req.body.appointmenttime;
    

    const newcompletedappointment = completedappointmentSchema({
        userId,
        name,
        cusType,
        vType,
        vNo,
        serviceType,
        issue,
        contactNo,
        appointmentdate,
        appointmenttime,
    });

    try {
        if (!name ||!cusType|| !vType || !vNo || !serviceType || !issue ||  !contactNo || !appointmentdate || !appointmenttime ) {
            return res.status(400).json({ message: 'All Fields Required' })
        }
        await newcompletedappointment.save()
        res.status(200).json({ message: 'Completed appointment added to DB' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


/* newcompletedappointment.save().then(()=>{
     res.json(" new Periodical Appointment added")
 }).catch((err)=>{
     console.log(err);
 })
}*/

exports.getcompletedappointment = async (req, res) => {
    completedappointmentSchema.find().then((completedappointment) => {
        res.json(completedappointment)
    }).catch((err) => {
        console.log(err)
    })

}

exports.getcompletedappointmentbyuserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const completedappointment = await completedappointmentSchema.find({ userId: userId });
        if (completedappointment) {
            res.status(200).send({ status: "User fetched", data: completedappointment });
        } else {
            res.status(404).send({ status: "User not found" });
        }
    } catch (err) {
        res.status(500).send({ status: "Error with getting user", error: err.message });
    }
  }
 
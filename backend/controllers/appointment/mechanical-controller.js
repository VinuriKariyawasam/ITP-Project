const { config } = require("dotenv")
const mechanicalSchema = require("../../models/appointment/mechanicalRepairs")


exports.addmechanicalAppointment = async (req, res) => {
    // get data from fronend in request body to backend

    const name = req.body.name;
    const vType = req.body.vType;
    const vNo = req.body.vNo;
    const issue = req.body.issue;
    const contactNo = Number(req.body.contactNo);
    const appointmentdate = new Date(req.body.appointmentdate);
    const appointmenttime = req.body.appointmenttime;
    

    const newmechanicalAppointment = mechanicalSchema({
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
        await newmechanicalAppointment.save()
        res.status(200).json({ message: 'NewAppointment added to DB' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


/* newmechanicalAppointment.save().then(()=>{
     res.json(" new Periodical Appointment added")
 }).catch((err)=>{
     console.log(err);
 })
}*/

exports.getmechanicalAppointment = async (req, res) => {
    mechanicalSchema.find().then((mechanicalAppointment) => {
        res.json(mechanicalAppointment)
    }).catch((err) => {
        console.log(err)
    })

}

exports.updatemechanicalAppointment= async (req, res) => {
    let mechanicalAppointmentId = req.params.id;
    //to get existing values
    const { name, vType, vNo,issue, contactNo, appointmentdate, appointmenttime } = req.body

    //object to store new values
    const updatemechanicalAppointment = {
        name,
        vType,
        vNo,
        issue,
        contactNo,
        appointmentdate,
        appointmenttime,
    }

    //to find relavant apoointment to update
    const update = await  mechanicalSchema.findByIdAndUpdate(mechanicalAppointmentId, updatemechanicalAppointment).then(() => {
        res.status(200).send({ status: "Updated"})
    }).catch((err) => {
        res.status(500).send({ status: "server error with update data", error: err.message });
    })

}
exports.deletemechanicalAppointment = async (req, res) => {
    const { id } = req.params;
    mechanicalSchema.findByIdAndDelete(id).then((mechanicalAppointment) => {
        res.status(200).json({ message: 'Mechanical Appointment Deleted Sucessfully' })
    }).catch((error) => {
        res.status(500).json({ message: 'Server Error' })
    })
}
exports.getOneMechanicalAppointment = async (req,res)=>{
    const {id}= req.params;
    try {
    const mechanicalAppointment = await mechanicalSchema.findById(id);
    if (mechanicalAppointment) {
        res.status(200).send({ status: "User fetched", data: mechanicalAppointment });
    } else {
        res.status(404).send({ status: "User not found" });
    }
} catch(err) {
    res.status(500).send({ status: "Error with getting user", error: err.message });
}
}

exports.getOneMechanicalAppointmentbyVno = async (req, res) => {
    const { vNo } = req.params;
    try {
        const mechanicalAppointment = await mechanicalSchema.findOne({ vNo: vNo });
        if (mechanicalAppointment) {
            res.status(200).send({ status: "User fetched", data: mechanicalAppointment });
        } else {
            res.status(404).send({ status: "User not found" });
        }
    } catch (err) {
        res.status(500).send({ status: "Error with getting user", error: err.message });
    }
}
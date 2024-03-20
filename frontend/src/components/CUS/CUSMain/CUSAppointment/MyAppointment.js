import React from "react";
import '../CUSAppointment/MyAppointment.css'

const MyAppointment  = props => {
    return (
        <div>
            <h1 className="headerDeatail">Appointment Details</h1>
            <div className="AdetailsDiv">
                <h2 className="DetailType">Vehicle No :</h2>
                <h2 className="DetailType">Appoinment type :</h2>
                <h2 className="DetailType">Date & Time :</h2>
                <h2 className="DetailType">Contact No :</h2>
            </div>
            <br></br>
            <div className="buttonContainer">
                <button className="button">Cancel Appointment</button>
                <button className="button">Reschedule Appoinment</button>
            </div>
        </div>
    );
}

export default MyAppointment;

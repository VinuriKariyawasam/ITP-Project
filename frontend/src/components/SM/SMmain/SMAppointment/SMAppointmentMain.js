import React from "react";
import Arrow from '../../../../images/SM/Appointment/Arrow.png'
import '../SMAppointment/SMAppointment.css'

const SMAppointmentMain = () => {
    return (
        <div className="div1">
            <h2 className="Aheader">Appointments</h2>
            <div className="div2">
            <button className="button">
                periodical Services
                <img src={Arrow} alt="Arrow" className="Arrow" />
            </button>
            </div>
            <div className="div2">
            <button className="button">
                Mechanical Repairs
                <img src={Arrow} alt="Arrow" className="Arrow" />
            </button>
            </div>
            <div className="div2">
            <button className="button">
                Accidental Repairs
                <img src={Arrow} alt="Arrow" className="Arrow" />
            </button>
            </div>




        </div>
    )

}

export default SMAppointmentMain;

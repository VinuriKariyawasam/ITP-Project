import React from "react";
import Arrow from '../../../../images/SM/Appointment/Arrow.png'
import '../SMAppointment/SMAppointment.css'
import { Link } from 'react-router-dom';

const SMAppointmentMain = () => {
    return (
        <div className="div1111">
            <h2 className="AppMainButtonPageHeading">Appointments</h2>
            <div className="div2222">
                <Link to='/staff/sm/pappointmentMain'>
                    <button className="SMMainbutton">
                        periodical Services
                        <img src={Arrow} alt="Arrow" className="SMMainArrow" />
                    </button>
                </Link>
            </div>
            <div className="div2222">
                <button className="SMMainbutton">
                    Mechanical Repairs
                    <img src={Arrow} alt="Arrow" className="SMMainArrow" />
                </button>
            </div>
            <div className="div2222">
                <button className="SMMainbutton">
                    Accidental Repairs
                    <img src={Arrow} alt="Arrow" className="SMMainArrow" />
                </button>
            </div>




        </div>
    )

}

export default SMAppointmentMain;

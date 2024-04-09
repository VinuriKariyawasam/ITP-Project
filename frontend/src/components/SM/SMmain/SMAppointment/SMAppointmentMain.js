import React from "react";
import Arrow from '../../../../images/SM/Appointment/Arrow.png'
import '../SMAppointment/SMAppointment.css'
import { Link } from 'react-router-dom';

const SMAppointmentMain = () => {
    return (
        <div className="SMA-div1">
            <h2 className="SMA-AppMainButtonPageHeading">Appointments</h2>
            <div className="SMA-div2222">
                <Link to='/staff/sm/periodicalappointment'>
                    <button className="SMA-SMMainbutton">
                        periodical Services
                        <img src={Arrow} alt="Arrow" className="SMA-SMMainArrow" />
                    </button>
                </Link>
            </div>
            <div className="SMA-div2222">
            <Link to='/staff/sm/mechanicalappointment'>
                    <button className="SMA-SMMainbutton">
                        Mechanical Repairs
                        <img src={Arrow} alt="Arrow" className="SMA-SMMainArrow" />
                    </button>
                </Link>
            </div>
            <div className="SMA-div2222">
            <Link to='/staff/sm/accidentalappointment'>
                <button className="SMA-SMMainbutton">
                    Accidental Repairs
                    <img src={Arrow} alt="Arrow" className="SMA-SMMainArrow" />
                </button>
                </Link>
            </div>
            



        </div>
    )

}

export default SMAppointmentMain;

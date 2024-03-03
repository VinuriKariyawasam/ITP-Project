import React from "react";
import '../src/SMAppointment.css'
import ArrowImage from '../src/projectImages/Arrow.png'

const SMAppointment = () => {
    return (
        <div>
            <h2 className="Aheader">Appointments</h2>
            <button className="button">
                periodical Services
                <img src={ArrowImage} alt="Arrow" className="Arrow" />
            </button>

            <button className="button">
                Mechanical Repairs
                <img src={ArrowImage} alt="Arrow" className="Arrow" />
            </button>

            <button className="button">
                Accidental Repairs
                <img src={ArrowImage} alt="Arrow" className="Arrow" />
            </button>





        </div>
    )

}

export default SMAppointment;

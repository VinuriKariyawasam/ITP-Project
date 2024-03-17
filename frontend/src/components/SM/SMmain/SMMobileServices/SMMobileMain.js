import React from "react";
import Arrow from '../../../../images/SM/Appointment/Arrow.png'
import './SMMobileServices.css'

const SMMobileMain = () => {
    return (
        <main id="main" className="main">
        <div className="div1">
            <h2 className="Aheader">Mobile Services</h2>
            <div className="div2">
            <button className="button">
                Mechanical Service Requests
                <img src={Arrow} alt="Arrow" className="Arrow" />
            </button>
            </div>
            <div className="div2">
            <button className="button">
                Emergency Breakdown Requests
                <img src={Arrow} alt="Arrow" className="Arrow" />
            </button>
            </div>
            <div className="div2">
            <button className="button">
                Vehicle Carrier Requests
                <img src={Arrow} alt="Arrow" className="Arrow" />
            </button>
            </div>
        




        </div>
        </main>
    )

}

export default SMMobileMain;

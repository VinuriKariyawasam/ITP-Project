import React from "react";
import Arrow from '../../../../images/SM/Appointment/Arrow.png'
import '../SMAppointment/SMAppointment.css'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const SMAppointmentMain = () => {
    return (
        <main id="main" className="main">
        <div className="SMA-div1">
            <h2 className="SMA-AppMainButtonPageHeading" >Appointments</h2>
            <div style={{display:"flex" , justifyContent: "space-between"}}>
            <div className="card text-center" style={{ width: "30%", backgroundColor: "white" }}>
      <div className="card-header">
        Periodical Appointments
      </div>
      <div className="card-body" >
        <h5 className="card-title">Heres comes Upcoming periodical Appointments</h5>
        <p className="card-text">Get an idea about what comes next.After checking available times you can accept or cancle appointments.</p>
      </div>
      <div className="card-footer text-body-secondary">
      <Link to='/staff/sm/periodicalappointment'>
                <Button>
                    Check
                    
                </Button>
                </Link>
      </div>
    </div>



    <div className="card text-center" style={{ width: "30%", backgroundColor: "white" }}>
      <div className="card-header">
        Mechanical Repair Appointments
      </div>
      <div className="card-body">
        <h5 className="card-title">Heres comes Upcoming Mechanical</h5>
        <p className="card-text">Get an idea about what comes next.After checking available times you can accept or cancle appointments.</p>
      </div>
      <div className="card-footer text-body-secondary">
      <Link to='/staff/sm/mechanicalappointment'>
                <Button>
                Check
                    
                </Button>
                </Link>
      </div>
    </div>




    <div className="card text-center" style={{ width: "30%", backgroundColor: "white" }}>
      <div className="card-header">
        Accidental Repairs
      </div>
      <div className="card-body">
        <h5 className="card-title">Heres comes Upcoming Accidental Repair Appointments</h5>
        <p className="card-text">Get an idea about what comes next.After checking available times you can accept or cancle appointments.</p>
      </div>
      <div className="card-footer text-body-secondary">
      <Link to='/staff/sm/accidentalappointment'>
                <Button>
                    Check
                    
                </Button>
                </Link>
      </div>
    </div>

    </div>
        </div>
        </main>
    )

}

export default SMAppointmentMain;

import React from 'react';
import './AppoinmentMain.css'
import img1 from '../../../../images/CUS/Appointment/img1.jpg'
import mechanical from '../../../../images/CUS/Appointment/mechanical.jpg'
import periodical from '../../../../images/CUS/Appointment/periodical.jpg'
import accident from '../../../../images/CUS/Appointment/accident.jpg'
import { Link } from 'react-router-dom';


const AppointnmentMain = () => {

    return (
        <div>
            <br /><br />
            <h1 className='AppointmentMainheader'>Our services are dedicated to delivering top-quality care under vigilant supervision and with utmost trust.</h1>
            <br /><br />
            <img className="AppointmentMainimg1" src={img1} />
            <br /><br /><br />
            <h1 className='AppointmentMainQ'>What Kind of Service You want?</h1>
            <br /><br /><br /><br /><br /> <br />
            <div className='AppointmentMaindiv1'>
                <div>
                    <img className='AppointmentMainimg2' src={periodical} />
                    <br /><br />
                    <h3 className='AppointmentMainperiodic'>Regular maintenance is key to keeping your vehicle running smoothly and reliably. Trust our service center for all your periodic repair needs.Schedule your periodic maintenance with us today and enjoy worry-free driving for years to come.</h3>
                    <br />
                    <Link className='AppointmentMaina' to='/customer/appointment/periodicalappointment'>
                        <button className="AppointmentMainperiodictButton">Periodic Services</button>
                    </Link>

                </div>
                <br />
                <div>
                    <img className='AppointmentMainimg3' src={mechanical} />
                    <br /><br />
                    <h3 className='AppointmentMainmechanical'>Experiencing issues while driving your vehicle? Don't let mechanical troubles disrupt your journey.Reach out to us today and let us get you back on track</h3>
                    <br />
                    <Link className='AppointmentMaina' to='/customer/appointment/mechanicalAppointment'>
                        <button className="AppointmentMainMechanicalButton" >Mechanical Repairs</button>
                    </Link>

                </div>
                <br />

                <div>

                    <img className='AppointmentMainimg4' src={accident} />
                    <br /><br />
                    <h3 className='AppointmentMainAccidental'> After an unfortunate accident, trust in our service center to restore your vehicle to its former glory. Have an appointment with our skilled technicians.</h3>
                    <br />
                    <Link className='AppointmentMaina' to='/customer/appointment/accidentalAppointment'>
                        <button className="AppointmentMainaccidentButton" >Accident Repaires</button>
                    </Link>
                </div>
                <br />
            </div>
        </div>

    )
}

export default AppointnmentMain;

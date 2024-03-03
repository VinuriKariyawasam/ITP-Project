import React from 'react';
import './AppoinmentMain.css'
import img1 from '../projectImages/img1.jpg'
import mechanical from '../projectImages/mechanical.jpg'
import periodical from '../projectImages/periodical.jpg'
import accident from '../projectImages/accident.jpg'
import { Link } from 'react-router-dom';


const AppointnmentMain = () => {

    return (
        <div>
            <br /><br />
            <h1 className='header'>Our services are dedicated to delivering top-quality care under vigilant supervision and with utmost trust.</h1>
            <br /><br />
            <img className="img1" src={img1} />
            <br />
            <br />
            <br />
            <h1 className='Q'>What Kind of Service You want?</h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='div1'>
                <div>
                    <img className='img2' src={periodical} />
                    <br /><br />
                    <h3 className='periodic'>Regular maintenance is key to keeping your vehicle running smoothly and reliably. Trust our service center for all your periodic repair needs.Schedule your periodic maintenance with us today and enjoy worry-free driving for years to come.</h3>
                    <br />
                    <Link className='a' to='/periodical'>
                        <button className="periodictButton">Periodic Services</button>
                    </Link>

                </div>
                <br />
                <div>
                    <img className='img3' src={mechanical} />
                    <br /><br />
                    <h3 className='mechanical'>Experiencing issues while driving your vehicle? Don't let mechanical troubles disrupt your journey.Reach out to us today and let us get you back on track</h3>
                    <br />
                    <Link className='a' to='/mechanical'>
                        <button className="MechanicalButton" >Mechanical Repairs</button>
                    </Link>

                </div>
                <br />

                <div>

                    <img className='img4' src={accident} />
                    <br /><br />
                    <h3 className='Accidental'> After an unfortunate accident, trust in our service center to restore your vehicle to its former glory. Have an appointment with our skilled technicians.</h3>
                    <br />
                    <Link className='a' to='/Accidental'>
                        <button className="accidentButton" >Accident Repaires</button>
                    </Link>
                </div>
                <br />
            </div>
        </div>

    )
}

export default AppointnmentMain;

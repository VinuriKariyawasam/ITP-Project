import React from 'react';
import './AppoinmentMain.css'
import img1 from '../../../../images/CUS/Appointment/img1.jpg'
import mechanical from '../../../../images/CUS/Appointment/mechanical.jpg'
import periodical from '../../../../images/CUS/Appointment/periodical2.jpg'
import accident from '../../../../images/CUS/Appointment/accident.jpg'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';


const AppointnmentMain = () => {

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };


    return (
        <div>
            <br />
            <h1 className='AppointmentMainheader'>Our services are dedicated to delivering top-quality care under vigilant supervision and with utmost trust.</h1>
            <br />
            <div style={{ position: "relative", width: "100%" }}>
                <img className="AppointmentMainimg1" src={img1} />
                <span style={{ position: 'absolute', top: '10%', left: '4%', color: "white", fontSize: "27px", textAlign: "justify", marginRight: "34%", fontWeight: "bold", textStroke: "1px black" }}>Welcome to NeoTech!!<br /><br /> We pride ourselves on offering top-notch services that keep your vehicle running smoothly.From routine maintenance to complex repairs, our skilled technicians are equipped to handle all your automotive needs.Our commitment to excellence means you can trust us to deliver reliable, efficient service every time.Come experience the difference at our automotive center and let us take care of your vehicle today!</span>
                <Button class="btn btn-primary btn-lg" style={{ position: 'absolute', top: '85%', left: '7%', transform: 'translate(-50%, -50%)' }} onClick={scrollToBottom}>Explore</Button>
            </div>
            <h1 className='AppointmentMainQ'>What Kind of Service You want?</h1>
            <div style={{display:"flex",
  justifyContent: "space-between",margin:"3%"}}>
            <Card style={{ width: "30%", backgroundColor: "white" }}>
                <Card.Img variant="top" src={periodical} />
                <Card.Body>
                    <Card.Title>Periodic Services</Card.Title>
                    <Card.Text>
                        Regular maintenance is key to keeping your vehicle running smoothly and reliably. Trust our service center for all your periodic repair needs.Schedule your periodic maintenance with us today and enjoy worry-free driving for years to come.
                    </Card.Text>
                    <Link to='/customer/appointment/periodicalappointment'>
            <Button variant="primary" className="exbtn">
                Make an Appointment
            </Button>
            </Link>
                </Card.Body>
            </Card>
            
            <Card style={{ width: "30%", backgroundColor: "white" }}>
          <Card.Img variant="top" src={mechanical} />
          <Card.Body>
            <Card.Title>Mechanical Repairs</Card.Title>
            <Card.Text>
            Experiencing issues while driving your vehicle? Don't let mechanical troubles disrupt your journey.Reach out to us today and let us get you back on track
            </Card.Text><br/><br/>
            <Link to='/customer/appointment/mechanicalAppointment'>
            <Button variant="primary" className="exbtn">
                Make an Appointment
            </Button>
            </Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "30%", backgroundColor: "white" }}>
          <Card.Img variant="top" src={accident} />
          <Card.Body>
            <Card.Title>Accident Repaires</Card.Title>
            <Card.Text>
            After an unfortunate accident, trust in our service center to restore your vehicle to its former glory. Have an appointment with our skilled technicians.
            </Card.Text><br/><br/><br/>
            <Link to='/customer/appointment/accidentalAppointment'>
            <Button variant="primary" className="exbtn">
                Make an Appointment
            </Button>
            </Link>
          </Card.Body>
        </Card>
        </div>
        </div>

    )
}

export default AppointnmentMain;

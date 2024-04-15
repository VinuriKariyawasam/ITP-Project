import React from 'react';
import './CusMobile.css'
import mobmechanical from '../../../../images/MobileServices/MobMechanical.webp'
import breakdown from '../../../../images/MobileServices/EmBreakdown.jpg'
import carrier from '../../../../images/MobileServices/vehicleCarriers.webp'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';


const CusMobileMain = () => {

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };


    return (
        <div>
            <br />
            <h1 className='MobileMainheader'>We Will Provide Mobile Services For Your Needs</h1><br />
            <h2 className='MobileMainQ'>Types of Mobile Services</h2>
            <div style={{display:"flex",justifyContent: "space-between",margin:"3%"}}>
            <Card style={{ width: "30%", backgroundColor: "white" }}>
                <Card.Img variant="top" src={mobmechanical} />
                <Card.Body>
                    <Card.Title>Mobile Mechanical Services</Card.Title>
                    <Card.Text>
                        Worried because you have no any time to visit a service center to repair your vehicle?                    
                        Do not have to be worried anymore.You can easily put a requests through mobile mechanical services and can select a comfortable place to repair your vehicle while doing your own works.
                        Get your work done easily. 
                    </Card.Text>
                    <Link to='/customer/mobservices/mobilemechanical'>
            <Button variant="primary" className="exbtn">
                Request mechanical service
            </Button>
            </Link>
                </Card.Body>
            </Card>
            
            <Card style={{ width: "30%", backgroundColor: "white" }}>
          <Card.Img variant="top" src={breakdown} />
          <Card.Body>
            <Card.Title>Emergency Breakdown Services</Card.Title>
            <Card.Text>
                Got an emergency breakdown of your vehicle on your way?
                Immediately requests a brekadown requests through breakdown service requests.Our mobile technicians will reach you and will provice quick repairs for youe vehicle.
            </Card.Text>
            <Link to='/customer/mobservices/breakdownrequests'>
            <Button variant="primary" className="exbtn">
               Request emergency breakdown service
            </Button>
            </Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "30%", backgroundColor: "white" }}>
          <Card.Img variant="top" src={carrier} />
          <Card.Body>
            <Card.Title>Vehicle Carrier Services</Card.Title>
            <Card.Text>
                Want to carry your vehicle for a service center or a another place?
                Here is the bect option for you.You can easily put a request through vehicle carrier services and get your work done.
            </Card.Text>
            <Link to='/customer/mobservices/vehiclecarriers'>
            <Button variant="primary" className="exbtn">
               Request vehicle carrier service
            </Button>
            </Link>
          </Card.Body>
        </Card>
        </div>
        </div>

    )
}

export default CusMobileMain;
import React from 'react'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Img1 from '../../../../images/Cushome/Mobile-Service.png'
import Img2 from '../../../../images/Cushome/Emergency.png'
import Img3 from '../../../../images/Cushome/carrier.png'
import { Link } from 'react-router-dom';

function card3() {
  return (
    <div  className="homecard3">
        <h2 style={{textAlign:"center",fontWeight:"bold"}}>We will come to you...</h2>
        <div  className="homecard-container">
        <Card style={{ width: "28%"}}>
          <Card.Img variant="top" src={Img1} style={{ width: "100%"}}/>
          <Card.Body>
          <Card.Title style={{ textAlign:"center",fontWeight:"bold"}}>Mobile Services</Card.Title>
            <Card.Text>
            With lots of unique blocks, you can easily build a page without coding. Build your next landing page.
            </Card.Text>
            <Link to='/customer/mobservices/mobilemain'>
            <Button  variant="outline-dark" className="exbtn">Learn more</Button></Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "28%"}}>
          <Card.Img variant="top" src={Img2} style={{ width: "100%"}} />
          <Card.Body>
          <Card.Title style={{ textAlign:"center",fontWeight:"bold"}}>Emergency Breakdown</Card.Title>
            <Card.Text>
            With lots of unique blocks, you can easily build a page without coding. Build your next landing page.
            </Card.Text>
            <Link to='/customer/mobservices/mobilemain'>
            <Button  variant="outline-dark" className="exbtn">Learn more</Button></Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "28%" }}>
          <Card.Img variant="top" src={Img3} style={{ width: "100%"}}/>
          <Card.Body>
          <Card.Title style={{ textAlign:"center",fontWeight:"bold"}}>Carrier Service</Card.Title>
            <Card.Text>
            With lots of unique blocks, you can easily build a page without coding. Build your next landing page.
            </Card.Text>
            <Link to='/customer/mobservices/mobilemain'>
            <Button variant="outline-dark" className="exbtn"> Learn more</Button></Link>
          </Card.Body>
        </Card>
        </div>
      </div>
  )
}

export default card3
import React from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import img from "../../../../images/Cushome/home1.jpg";
function card2() {
  return (
    <div className="cushomecard2holder">
        <Card className="cushomecard2">
          <Card.Title style={{marginTop:"4%", fontSize: "35px" }}>
            Expert Technicians for All Your Automotive Needs
          </Card.Title>
          <Card.Text style={{paddingLeft:"2%",paddingRight:"2%",textAlign:"justify"}}>
            At our automotive center, we take pride in our team of expert
            technicians who are dedicated to providing top-notch service. With
            state-of-the-art equipment and years of experience, we have what it
            takes to handle all your automotive needs.
          </Card.Text>
          <Card.Text style={{marginTop:"1.5%",marginLeft:"17%" }}>
          <i class="bi bi-wrench" style={{ marginRight:"10px"}}/>
           Quality Repairs and Maintenance Services
          </Card.Text>
          <Card.Text style={{marginLeft:"17%" }}>
          <i class="bi bi-clock-history" style={{ marginRight:"10px"}}/>
           Fast and Efficient Service for Your Vehicle
          </Card.Text>
          <Card.Text style={{ marginLeft:"17%"}}>
          <i class="bi bi-coin" style={{ marginRight:"10px"}}/>
           Affordable Prices for Every Budget
          </Card.Text>
          <Button variant="dark" style={{marginTop:"3%",marginLeft:"30%", marginRight: "45%" }}>
            Explore More
          </Button>
        </Card>
        <img src={img} alt="Home" style={{width: "40%",float:"Right",marginRight: "5%",height:"20%",borderRadius:"2%" }}/>
      </div>
  )
}

export default card2
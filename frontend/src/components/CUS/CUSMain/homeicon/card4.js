import React from 'react'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img1 from "../../../../images/user.jpg"
function card4() {
  return (
    <div style={{marginTop:"3%",textAlign:"center"}}>
    <h2 style={{textAlign:"center",fontWeight:"bold"}}>What people say about us</h2>
    <p className='cushomea' disabled>This will help you to find the perfection of our work.</p>
    <div className='homecard4-holder' >
    <Card style={{ width: "30%"}}>
      <Card.Img variant="top" src={img1} style={{marginLeft:"40%",marginTop:"7%", width: "20%",borderRadius:"50%"}}/>
      <Card.Body>
        <Card.Text>
        comment
        </Card.Text>
        <Card.Title style={{ textAlign:"center",fontWeight:"bold",color:"black"}}>owner</Card.Title>
      </Card.Body>
    </Card>
    <Card style={{ width: "30%"}}>
      <Card.Img variant="top" src={img1} style={{marginLeft:"40%",marginTop:"7%", width: "20%",borderRadius:"50%"}} />
      <Card.Body>
        <Card.Text>
        comment
        </Card.Text>
        <Card.Title style={{ textAlign:"center",fontWeight:"bold",color:"black"}}>owner</Card.Title>
      </Card.Body>
    </Card>
    <Card style={{ width: "30%" }}>
      <Card.Img variant="top" src={img1} style={{marginLeft:"40%",marginTop:"7%", width: "20%",borderRadius:"50%"}}/>
      <Card.Body>
        <Card.Text>
        comment
        </Card.Text>
        <Card.Title style={{ textAlign:"center",fontWeight:"bold",color:"black"}}>owner</Card.Title>
      </Card.Body>
    </Card>
    </div>
  </div>
  )
}

export default card4
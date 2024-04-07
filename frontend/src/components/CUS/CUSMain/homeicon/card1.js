import React from 'react'
import Card from "react-bootstrap/Card";
function card1() {
  return (
    <Card className="cushomecard1">
        <Card.Text style={{ marginLeft: "20%", marginRight: "20%" }}>
          At our automotive center, we provide top-notch car service and repair
          to keep your vehicle running
        </Card.Text>
        <Card.Text style={{ marginLeft: "22%", marginRight: "22%" }}>
          smoothly. Our team of skilled technicians is dedicated to delivering
          exceptional quality and
        </Card.Text>
        <Card.Text style={{ marginLeft: "20%", marginRight: "20%" }}>
          customer satisfaction.
        </Card.Text>
      </Card>
  )
}

export default card1
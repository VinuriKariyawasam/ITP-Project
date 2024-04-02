import React from "react";
import "./SMMain.css";
import SMDashboard from "./SMDashboard"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function SMMain() {
  return (
    <main id="main" className="main">
      <h1>Service Manager </h1>
      <h3 className="SMmainsubHead"> Here's a quick summary of what's happening in your team.</h3>
      <SMDashboard />

      <Card>
        <Card.Body>
          <Card.Text style={{ float: "left", marginTop:"1.5%",marginBottom:"-1%"  }}>new service Requests</Card.Text>
          <Button style={{ float: "right",marginTop:"1%" , marginBottom:"-1%"}}>explore</Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Text style={{ float: "left", marginTop:"1.5%",marginBottom:"-1%"  }}>Add a Service record</Card.Text>
          <Button style={{ float: "right",marginTop:"1%" , marginBottom:"-1%"}}>explore</Button>
        </Card.Body>
      </Card>


      <Card>
        <Card.Body>
          <Card.Text style={{ float: "left", marginTop:"1.5%",marginBottom:"-1%"  }}>Create a service report</Card.Text>
          <Button style={{ float: "right",marginTop:"1%" , marginBottom:"-1%"}}>explore</Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Text style={{ float: "left", marginTop:"1.5%",marginBottom:"-1%"  }}>View Service History</Card.Text>
          <Button style={{ float: "right",marginTop:"1%" , marginBottom:"-1%"}}>explore</Button>
        </Card.Body>
      </Card>
    </main>
  );
}

export default SMMain;

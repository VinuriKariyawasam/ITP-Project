import React from "react";
import "./superMain.css";
import SuperDashboard from "./SuperDashboard";
import SuperPageTitle from "./SUPERPageTitle";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function SuperMain({ toggleLoading }) {
  return (
    <main id="main" className="main">
      <SuperPageTitle title="Supervisor Dashboard" url="/supervisor/" />
      <SuperDashboard toggleLoading={toggleLoading}/>

      <Card>
        <Card.Body>
          <Card.Text style={{ float: "left", marginTop:"1.5%",marginBottom:"-1%"  }}>Register a Vehicle</Card.Text>
          <Link to="/staff/supervisor/vehicle/add">
          <Button style={{ float: "right",marginTop:"1%" , marginBottom:"-1%"}} variance="primary">Register</Button>
          </Link>
        </Card.Body>
      </Card>


      <Card>
        <Card.Body>
          <Card.Text style={{ float: "left", marginTop:"1.5%",marginBottom:"-1%"  }}>Create a service request</Card.Text>
          <Link to="/staff/supervisor/serviceReq/add">
          <Button style={{ float: "right",marginTop:"1%" , marginBottom:"-1%"}} variance="primary">Create</Button>
          </Link>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Text style={{ float: "left", marginTop:"1.5%",marginBottom:"-1%"  }}>View Products</Card.Text>
          <Link to="/customer/products">
          <Button style={{ float: "right",marginTop:"1%" , marginBottom:"-1%"}} variance="primary">Explore</Button>
          </Link>
        </Card.Body>
      </Card>
      
    </main>
  );
}

export default SuperMain;

import React from "react";
import "../IMMain/IMMain.css";
import IMDashboard from "../IMMain/IMDashboard";
import "./Products/Lubricants";
import ImPageTitle from "./ImPageTitle";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

function IMMain() {
  return (
    <main id="main" className="main">
      <ImPageTitle title="Inventory Manager Dashboard" url="/staff/im" />
      <IMDashboard />
      <br />
      <h2>Featured Resources</h2>
        <Card >
          <Card.Body>
            <Card.Text style={{marginTop:"1.5%" , float:"left", marginbottom:"-1%"}}>Manage Pending Orders</Card.Text>
            <Button style={{marginTop:"1%", float:"right", marginbottom:"-1%"}}>Mange</Button>
          </Card.Body>
        </Card>
        <Card >
          <Card.Body>
            <Card.Text style={{marginTop:"1.5%" , float:"left", marginbottom:"-1.5%"}}>Manage Tires Stock</Card.Text>
            <Link to="Tires">
              <Button style={{marginTop:"1%", float:"right", marginbottom:"-1%"}}>Mange</Button>
            </Link>
          </Card.Body>
        </Card>
        <Card >
          <Card.Body>
            <Card.Text style={{marginTop:"1.5%" , float:"left", marginbottom:"-1%"}}>Manage Lubricant Stock</Card.Text>
            <Link to="lubricants">
              <Button style={{marginTop:"1%", float:"right", marginbottom:"-1%"}}>Mange</Button>
            </Link>
          </Card.Body>
        </Card>
  
    </main>
  );
}

export default IMMain;

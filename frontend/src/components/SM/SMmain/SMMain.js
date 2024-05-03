import React from "react";
import "./SMMain.css";
import SMDashboard from "./SMDashboard"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import SMPageTitle from "./SMPageTitle";
import { Link } from 'react-router-dom';


function SMMain({ toggleLoading }) {
  return (
    <main id="main" className="main">
      <SMPageTitle />
      <SMDashboard toggleLoading={toggleLoading}/>
      <Card>
        <Card.Body>
          <Card.Text style={{ float: "left", marginTop:"1.5%",marginBottom:"-1%"  }}>Make a new service Quotation</Card.Text>

          <Link to="/staff/sm/quotation/add">

          <Button style={{ float: "right",marginTop:"1%" , marginBottom:"-1%"}} variance="primary">explore</Button>
          </Link>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Text style={{ float: "left", marginTop:"1.5%",marginBottom:"-1%"  }}>Add a Service record</Card.Text>
          <Link to="/staff/sm/record/add">
          <Button style={{ float: "right",marginTop:"1%" , marginBottom:"-1%"}} variance="primary">explore</Button>
          </Link>
        </Card.Body>
      </Card>


      <Card>
        <Card.Body>
          <Card.Text style={{ float: "left", marginTop:"1.5%",marginBottom:"-1%"  }}>Create a service report</Card.Text>
          <Link to="/staff/sm/report/add">
          <Button style={{ float: "right",marginTop:"1%" , marginBottom:"-1%"}} variance="primary">explore</Button>
          </Link>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Text style={{ float: "left", marginTop:"1.5%",marginBottom:"-1%"  }}>View Service History</Card.Text>
          <Link to="/staff/sm/record">
          <Button style={{ float: "right",marginTop:"1%" , marginBottom:"-1%"}} variance="primary">explore</Button>
          </Link>
        </Card.Body>
      </Card>

    </main>
  );
}

export default SMMain;
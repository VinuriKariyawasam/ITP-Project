import React from "react";
import "./GMMain.css";
import PageTitle from "./GMPageTitle";
import Dashboard from "./GMDashboard";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Main() {
  return (
    <main id="main" className="main">
      <PageTitle />
      <Dashboard />
      <Card>
        <Card.Body>
          <Card.Text
            style={{ float: "left", marginTop: "1.5%", marginBottom: "-1%" }}
          >
            Financial Reports
          </Card.Text>
          <Link to="/staff/finance/financial-reports">
            <Button
              style={{ float: "right", marginTop: "1%", marginBottom: "-1%" }}
              variance="primary"
            >
              Explore
            </Button>
          </Link>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Text
            style={{ float: "left", marginTop: "1.5%", marginBottom: "-1%" }}
          >
            View Attendance
          </Card.Text>

          <Link to="/staff/hr/attendance">
            <Button
              style={{ float: "right", marginTop: "1%", marginBottom: "-1%" }}
              variance="primary"
            >
              Explore
            </Button>
          </Link>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Text
            style={{ float: "left", marginTop: "1.5%", marginBottom: "-1%" }}
          >
            View Appointment Sheduled calendar
          </Card.Text>
          <Link to="/staff/sm/shedules">
            <Button
              style={{ float: "right", marginTop: "1%", marginBottom: "-1%" }}
              variance="primary"
            >
              Explore
            </Button>
          </Link>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Text
            style={{ float: "left", marginTop: "1.5%", marginBottom: "-1%" }}
          >
            View sales
          </Card.Text>
          <Link to="/staff/im/sales">
            <Button
              style={{ float: "right", marginTop: "1%", marginBottom: "-1%" }}
              variance="primary"
            >
              Explore
            </Button>
          </Link>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>

          <Card.Text style={{ float: "left", marginTop:"1.5%",marginBottom:"-1%"  }}>View Consultancy Page</Card.Text>
          <Link to="/staff/cam/con_support">
          <Button style={{ float: "right",marginTop:"1%" , marginBottom:"-1%"}} variance="primary">explore</Button>

          </Link>
        </Card.Body>
      </Card>
    </main>
  );
}

export default Main;

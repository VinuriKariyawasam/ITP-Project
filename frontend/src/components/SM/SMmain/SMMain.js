import React from "react";
import "./SMMain.css";
import SMDashboard from "../SMmain/SMDashboard"
import Button from 'react-bootstrap/Button';


function SMMain() {
  return (
    <main id="main" className="main">
      <h1>Service Manager </h1>
      <h3 className="SMmainsubHead"> Here's a quick summary of what's happening in your team.</h3>
      <SMDashboard />
      <div class="card">
        <ul class="list-group">
          <li class="list-group-item">New service Requests
            <Button variant="primary" style={{ float: 'right' }}>
              Explore
            </Button>
          </li>
        </ul>
        <ul class="list-group">
          <li class="list-group-item">Add a Service record
            <Button variant="primary" style={{ float: 'right' }}>
              Explore
            </Button>
          </li>
        </ul>
        <ul class="list-group">
          <li class="list-group-item">Create a service report
            <Button variant="primary" style={{ float: 'right' }}>
              Explore
            </Button>
          </li>
        </ul>
        <ul class="list-group">
          <li class="list-group-item">View Service History
            <Button variant="primary" style={{ float: 'right' }}>
              Explore
            </Button>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default SMMain;

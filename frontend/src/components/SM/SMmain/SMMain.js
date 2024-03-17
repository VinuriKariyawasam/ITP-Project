import React from "react";
import "./SMMain.css";
import SMDashboard from "../SMmain/SMDashboard"


function SMMain() {
  return (
    <main id="main" className="main">
      <h1>Service Manager </h1>
      <h3 className="subHead"> Here's a quick summary of what's happening in your team.</h3>
      <SMDashboard />
      <div class="card">
        <ul class="list-group">
          <li class="list-group-item">New service Requests
            <button className="btn">See More</button>
          </li>
          </ul>
          <ul class="list-group">
          <li class="list-group-item">Add a Service record
            <button className="btn">Add</button>
          </li>
          </ul>
          <ul class="list-group">
          <li class="list-group-item">Create a service report
            <button className="btn">Create</button>
          </li>
          </ul>
          <ul class="list-group">
          <li class="list-group-item">View Service History
            <button className="btn">View</button>
          </li>
        </ul>
        <ul class="list-group">
          <li class="list-group-item">Mobile Service Requests
            <button className="btn">View</button>
          </li>
        </ul>
        </div>
    </main>
  );
}

export default SMMain;

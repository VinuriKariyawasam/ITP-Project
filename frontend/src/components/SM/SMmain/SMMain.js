import React from "react";
import "./SMMain.css";
import SMDashboard from "../SMmain/SMDashboard"


function SMMain() {
  return (
    <main id="main" className="main">
      <h1>Service Manager </h1>
      <h3 className="subHead"> Here's a quick summary of what's happening in your team.</h3>
      <SMDashboard />
      
      <div className="divtag"> 
      <h2 className="subHead"> Quick Access</h2>
      <h3 className="details">New service Requests</h3><button className="btnDetails">See More</button><div/>
      <h3 className="details">Add a Service record</h3><button className="btnDetails">Add</button><div/>
      <h3 className="details">Create a service report</h3><button className="btnDetails">Create</button><div/>
      <h3 className="details">View Service History</h3><button className="btnDetails">View</button><div/>
      </div>
    </main>
  );
}

export default SMMain;

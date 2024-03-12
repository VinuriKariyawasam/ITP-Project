import React from "react";
import "../IMMain/IMMain.css";
import IMDashboard from "../IMMain/IMDashboard";
import './Lubricants'
import ImPageTitle from './ImPageTitle'

function IMMain() {
  return (
    <main id="main" className="main">
      <ImPageTitle title="Inventory Manager Dashboard" url="/im" />
      <IMDashboard />
      <br/>
      <h2>Featured Resources</h2>
      <div class="card2">
          <ul class="list-group ">
            
            <li class="list-group-item">Manage Pending Orders
            <button className="btn1">Manage</button>
            </li>
            
            <li class="list-group-item">Manage Tires Stock
            <button className="btn1">Manage</button>
            </li>
            
            <li class="list-group-item">Manage Lubricant Stock
            <button className="btn1">Manage</button>
            </li>
            
          </ul>
        </div>
    </main>
  );
}

export default IMMain;

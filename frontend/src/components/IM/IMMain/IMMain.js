import React from "react";
import "../IMMain/IMMain.css";
import IMDashboard from "../IMMain/IMDashboard";


function IMMain() {
  return (
    <main id="main" className="main">
      <h1>Inventory Manager Dashboard</h1>
      <IMDashboard />

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

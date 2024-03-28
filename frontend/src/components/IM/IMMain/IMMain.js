import React from "react";
import "../IMMain/IMMain.css";
import IMDashboard from "../IMMain/IMDashboard";
import './Products/Lubricants'
import ImPageTitle from './ImPageTitle'
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'

function IMMain() {
  return (
    <main id="main" className="main">
      <ImPageTitle title="Inventory Manager Dashboard" url="/staff/im" />
      <IMDashboard />
      <br/>
      <h2>Featured Resources</h2>
      <div class="card2">
          <ul class="list-group ">
            
            <li class="list-group-item">Manage Pending Orders
            <Button variant="primary" className="btn1">Manage</Button>
            </li>
            
            <li class="list-group-item">Manage Tires Stock
            <Link to="Tires">
            <Button variant="primary" className="btn1">Manage</Button>
            </Link>
            </li>
            
            <li class="list-group-item">Manage Lubricant Stock
            <Link to="lubricants">
            <Button variant="primary" className="btn1">Manage</Button>
            </Link>
            </li>
            
          </ul>
        </div>
    </main>
  );
}

export default IMMain;

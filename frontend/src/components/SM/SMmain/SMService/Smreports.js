import React from "react";
//import SMPageTitle from "./SMPageTitle";
import Addreport from "./reports";
import ReportDash from "./reportDash";
import "../SMMain";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RecDash from "./RecDash";

function Smreports() {
  return (
    <main id="main" className="main">
      
      

      <Routes>
        <Route path="/" element ={<ReportDash/>}/>
        <Route path="/add" element={<Addreport/>} />
      </Routes>
    </main>
  );
}

export default Smreports;
import React from "react";
//import SMPageTitle from "./SMPageTitle";
import ServiceReqDash from "./smservicReq";
import "../SMMain";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


function SmSrequest({toggleLoading}) {
  return (
    <main id="main" className="main">
      
      

      <Routes>
        <Route path="/" element ={<ServiceReqDash toggleLoading={toggleLoading}/>}/>
      </Routes>
    </main>
  );
}

export default SmSrequest;
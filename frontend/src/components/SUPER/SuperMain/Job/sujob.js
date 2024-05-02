import React from "react";
import JobSchedulerForm from "./jobschedule";
import JobDash from "./jobDash";
import "../../SuperMain/SuperMain";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


function Sujob({ toggleLoading }) {
  return (
    <main id="main" className="main">
      
      

      <Routes>
       
        <Route path="/" element={<JobDash toggleLoading={toggleLoading}/>} />
        <Route path="/add" element={<JobSchedulerForm toggleLoading={toggleLoading}/>} />
      </Routes>
    </main>
  );
}

export default Sujob;
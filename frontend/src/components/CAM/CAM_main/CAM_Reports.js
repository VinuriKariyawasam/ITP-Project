import React from 'react';
import './CAM_main.css';
import CAM_pageTitle from './CAM_pageTitle';
import Reports from './Reports';


// Import front end routes
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";

  function CAM_Reports(){
    return (
      <main id="main" className="main">
      <CAM_pageTitle title="Evaluation Reports" url="/staff/cam/reports" />
       <Routes>
       <Route path="/*" element={<Reports/>} />
       </Routes>
    </main>
    
    );
  }

  export default CAM_Reports;
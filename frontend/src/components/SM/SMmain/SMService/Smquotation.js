import React from "react";
//import SMPageTitle from "./SMPageTitle";
import Addquotation from "./quotation";
import QuotaDash from "./QuotaDash";

import "../SMMain";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RecDash from "./RecDash";

function Smrecords({ toggleLoading }) {
  return (
    <main id="main" className="main">
      
      

      <Routes>
       <Route path="/" element={<QuotaDash toggleLoading={toggleLoading}/>} />
        <Route path="/add" element={<Addquotation toggleLoading={toggleLoading}/>} />
        
      </Routes>
    </main>
  );
}

export default Smrecords;
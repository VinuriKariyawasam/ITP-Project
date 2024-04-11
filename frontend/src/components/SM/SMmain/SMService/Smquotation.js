import React from "react";
//import SMPageTitle from "./SMPageTitle";
import Addquotation from "./quotation";
import "../SMMain";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RecDash from "./RecDash";

function Smrecords() {
  return (
    <main id="main" className="main">
      
      

      <Routes>
        <Route path="/add" element={<Addquotation/>} />
      </Routes>
    </main>
  );
}

export default Smrecords;
import React from "react";
//import SMPageTitle from "./SMPageTitle";
import Addrecord from "./Addrecord";
import RecDash from "./RecDash";
import "../SMMain";


// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function Smrecords({ toggleLoading }) {
  return (
    <main id="main" className="main">
      
      

      <Routes>
        <Route path="/" element={<RecDash toggleLoading={toggleLoading} />} />
        <Route path="/add" element={<Addrecord toggleLoading={toggleLoading}/>} />
      </Routes>
    </main>
  );
}

export default Smrecords;
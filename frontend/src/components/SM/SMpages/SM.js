import React from "react";
import SMSidebar from "../SMsidebar/SMSidebar"
import SMMain from "../SMmain/SMMain"
import Addrecord from "../SMmain/SMRecords/Addrecord"
import Smrecords from "../SMmain/SMRecords/Smrecords"
import title from "../SMmain/SMRecords/SMPageTitle"

import RecDash from "../SMmain/SMRecords/RecDash"
// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


function SM() {
  return (
    <>
      <SMSidebar />

      <Routes>
        <Route path="/" element={<SMMain/>} />
       
 /*Add udara's route here*/
        <Route path="/recDash" element={<RecDash/>} />
        <Route path="/add" element={<Addrecord/>} />
        <Route path="/records" element={<Smrecords/>} />

      </Routes>
    </>
  );
}

export default SM;
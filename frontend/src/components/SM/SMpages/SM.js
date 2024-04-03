import React from "react";
import SMSideBar from "../SMsidebar/SMSideBar"
import SMmain from "../SMmain/SMMain"
import SMMobileMain from "../SMmain/SMMobileServices/SMMobileMain"
import SMmMechanicalServices from "../SMmain/SMMobileServices/SMmMechanicalServices";

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
      <SMSideBar />

      <Routes>
        <Route path="/" element={<SMmain/>} />
        <Route path="/MobileMain" element={<SMMobileMain/>} />
        <Route path="/MobileMechanical" exact element={<SMmMechanicalServices/>} />
        
      </Routes>
    </>
  );
}

export default SM;
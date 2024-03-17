import React from "react";
import SMSideBar from "../SMsidebar/SMSideBar"
import SMmain from "../SMmain/SMMain"
import SMMobileMain from "../SMmain/SMMobileServices/SMMobileMain"
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
        
      </Routes>
    </>
  );
}

export default SM;
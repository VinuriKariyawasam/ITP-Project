import React from "react";
import SMSideBar from "../SMsidebar/SMSideBar"
import SMmain from "../SMmain/SMMain"
import SMAppointmentMain from "../SMmain/SMAppointment/SMAppointmentMain"
import Header from '../../Header/Header'
import SMPeriodicalServices from "../SMmain/SMAppointment/SMPeriodicalServices";
import SMMechanicalRepairs from "../SMmain/SMAppointment/SMMechanicalRepairs"
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
     <Header />
      <SMSideBar />

      <Routes>
        <Route path="/" exact element={<SMmain/>} />
        <Route path="appointmentmain/" element={<SMAppointmentMain/>} />
        <Route path="periodicalappointment" exact element={<SMPeriodicalServices />} />
        <Route path="mechanicalappointment" exact element={<SMMechanicalRepairs />} />
        
      </Routes>
    </>
  );
}

export default SM;
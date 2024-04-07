import React from "react";
import SMSideBar from "../SMsidebar/SMSidebar";
import SMmain from "../SMmain/SMMain";
import SMAppointmentMain from "../SMmain/SMAppointment/SMAppointmentMain";
import Header from "../../Header/Header";
import SMPeriodicalServices from "../SMmain/SMAppointment/SMPeriodicalServices";
import SMMechanicalRepairs from "../SMmain/SMAppointment/SMMechanicalRepairs"
import Shedules from "../SMmain/SMAppointment/Shedules"
import Smrecords from "../SMmain/SMService/Smrecords";
import SMMobileMain from "../SMmain/SMMobileservices/SMMobileMain"
import SMmMechanicalServices from "../SMmain/SMMobileservices/SMmMechanicalServices";


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

        <Route path="/" exact element={<SMmain />} />
        <Route path="appointmentmain/" element={<SMAppointmentMain/>} />
        <Route path="periodicalappointment" exact element={<SMPeriodicalServices />} />
        <Route path="mechanicalappointment" exact element={<SMMechanicalRepairs />} />
        <Route path="shedules" exact element={<Shedules />} />
        <Route path="record/*" element={<Smrecords />} />
        <Route path="/MobileMain" element={<SMMobileMain/>} />
        <Route path="/MobileMechanical" exact element={<SMmMechanicalServices/>} />

      </Routes>
    </>
  );
}

export default SM;

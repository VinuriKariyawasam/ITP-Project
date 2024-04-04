import React from "react";
import SMSideBar from "../SMsidebar/SMSidebar";
import SMmain from "../SMmain/SMMain";
import SMAppointmentMain from "../SMmain/SMAppointment/SMAppointmentMain";
import Header from "../../Header/Header";
import SMPeriodicalServices from "../SMmain/SMAppointment/SMPeriodicalServices";
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
        <Route path="appointmentMain/" element={<SMAppointmentMain />} />
        <Route
          path="pappointmentMain"
          exact
          element={<SMPeriodicalServices />}
        />
        <Route path="record/*" element={<Smrecords />} />
        <Route path="/MobileMain" element={<SMMobileMain/>} />
        <Route path="/MobileMechanical" exact element={<SMmMechanicalServices/>} />
      </Routes>
    </>
  );
}

export default SM;

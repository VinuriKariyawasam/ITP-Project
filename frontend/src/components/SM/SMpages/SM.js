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
import SMmVehicleCarriers from "../SMmain/SMMobileservices/SMmVehicleCarriers";
import SMmEmBreakdown from "../SMmain/SMMobileservices/SMmEmBreakdown"; 
import PeriodicalHistory from "../SMmain/SMAppointment/PeriodicalHistory";
import Mechanicalhistory from "../SMmain/SMAppointment/mechanicalhistory";
import SMAccidentalRepairs from "../SMmain/SMAppointment/SMAccidental";
import AccidentalHistory from "../SMmain/SMAppointment/accidentalHistory"
import Smquotation from "../SMmain/SMService/Smquotation";
import Smreports from "../SMmain/SMService/Smreports";
import SmSrequest from "../SMmain/SMService/smSRequest";
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
        <Route path="/periodicalhistory" exact element={<PeriodicalHistory/>} />
        <Route path="/mechanicalhistory" exact element={<Mechanicalhistory/>} />
        <Route path="/accidentalappointment" exact element={<SMAccidentalRepairs />} />
        <Route path="/accidentalhistory" exact element={<AccidentalHistory />} />
        <Route path="record/*" element={<Smrecords />} />
        <Route path="/mobilemain" element={<SMMobileMain/>} />
        <Route path="/mobilemechanical" exact element={<SMmMechanicalServices/>} />
        <Route path="/breakdownrequests" exact element={<SMmEmBreakdown/>} />
        <Route path="/vehiclecarriers" exact element={<SMmVehicleCarriers/>} />
        <Route path="quotation/*" element={<Smquotation/>} />
        <Route path="report/*" element={<Smreports/>} />
        <Route path="serviceReq/*" element={<SmSrequest/>} />
      </Routes>
    </>
  );
}

export default SM;
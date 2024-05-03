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



function SM({ toggleLoading }) {
  return (
    <>
      <Header />
      <SMSideBar />

      <Routes>

        <Route path="/" exact element={<SMmain toggleLoading={toggleLoading} />} />
        <Route path="appointmentmain/" element={<SMAppointmentMain toggleLoading={toggleLoading} />} />
        <Route path="periodicalappointment" exact element={<SMPeriodicalServices toggleLoading={toggleLoading}  />} />
        <Route path="mechanicalappointment" exact element={<SMMechanicalRepairs toggleLoading={toggleLoading} />} />
        <Route path="shedules" exact element={<Shedules toggleLoading={toggleLoading} />} />
        <Route path="/periodicalhistory" exact element={<PeriodicalHistory toggleLoading={toggleLoading} />} />
        <Route path="/mechanicalhistory" exact element={<Mechanicalhistory toggleLoading={toggleLoading} />} />
        <Route path="/accidentalappointment" exact element={<SMAccidentalRepairs toggleLoading={toggleLoading} />} />
        <Route path="/accidentalhistory" exact element={<AccidentalHistory toggleLoading={toggleLoading} />} />

        <Route path="record/*" element={<Smrecords toggleLoading={toggleLoading}/>} />
        <Route path="/mobilemain" element={<SMMobileMain toggleLoading={toggleLoading}/>} />
        <Route path="/mobilemechanical" exact element={<SMmMechanicalServices toggleLoading={toggleLoading}/>} />
        <Route path="/breakdownrequests" exact element={<SMmEmBreakdown toggleLoading={toggleLoading}/>} />
        <Route path="/vehiclecarriers" exact element={<SMmVehicleCarriers toggleLoading={toggleLoading}/>} />
        <Route path="quotation/*" element={<Smquotation toggleLoading={toggleLoading}/>} />
        <Route path="report/*" element={<Smreports toggleLoading={toggleLoading}/>} />
        <Route path="serviceReq/*" element={<SmSrequest toggleLoading={toggleLoading}/>} />

      </Routes>
    </>
  );
}

export default SM;
import React from "react";
import "./superMain.css";
import SuperPageTitle from "./SUPERPageTitle";
import AddServiceReq from "./AddServiceReq";
import ServiceReqDash from "./ServiceReqDash";

import { Routes, Route, Navigate } from "react-router-dom";

function SuperServiceReq({ toggleLoading }) {
    return (
      <main id="main" className="main">
        <SuperPageTitle title="Service Request" url="staff/supervisor/serviceReq/" />
  
        <Routes>
          <Route path="/" element={<ServiceReqDash toggleLoading={toggleLoading}/>} />
          <Route path="add" element={<AddServiceReq toggleLoading={toggleLoading}/>} />
        </Routes>
      </main>
    );
  }
  
  export default SuperServiceReq;
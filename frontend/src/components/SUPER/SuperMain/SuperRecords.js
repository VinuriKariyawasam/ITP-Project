import React from "react";
import "./superMain.css";
import SuperPageTitle from "./SUPERPageTitle";
import AddServiceReq from "./AddServiceReq";
import ServiceReqDash from "./ServiceReqDash";
import RecDash from "../../SM/SMmain/SMService/RecDash";



import { Routes, Route, Navigate } from "react-router-dom";

function SuperProducts({ toggleLoading }) {
    return (
      <main id="main" className="main">
        <SuperPageTitle title="Service Records" url="staff/supervisor/records/" />
        <RecDash toggleLoading={toggleLoading}/>
      </main>
    );
  }
  
  export default SuperProducts;
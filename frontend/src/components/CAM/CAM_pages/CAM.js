import React from "react";
import CAM_main from "../CAM_main/CAM_main";
import CAM_sideBar from "../CAM_sidebar/CAM_sideBar";
import CAM_consultancy from "../CAM_main/CAM_consultancy";
import ContactDash from "../CAM_main/contactusDash";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function CAM() {
  return (
    <>
      <CAM_sideBar/>

      <Routes>
        <Route path="/" element={<CAM_main />} />
        <Route path="con_support/*" element={<CAM_consultancy/>} />
        <Route path="contactDash" element={<ContactDash/>} />
        
      </Routes>
    </>
  );
}

export default CAM;
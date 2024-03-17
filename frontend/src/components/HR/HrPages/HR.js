import React from "react";
import HrMain from "../hrMain/HrMain";
import HrSideBar from "../hrSidebar/HrSideBar";
import HrEmployee from "../hrMain/HrEmployee";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  //Routes,
  Navigate,
} from "react-router-dom";

function HR() {
  return (
    <>
      <HrSideBar />

      <Routes>
        <Route path="/" element={<HrMain />} />
        <Route path="employee/*" element={<HrEmployee />} />
      </Routes>
    </>
  );
}

export default HR;

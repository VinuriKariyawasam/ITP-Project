import React from "react";
import HrMain from "../hrMain/HrMain";
import HrSideBar from "../hrSidebar/HrSideBar";
import HrEmployee from "../hrMain/HrEmployee";
import HrAttendance from "../hrMain/HrAttendance";
import HrLeaves from "../hrMain/HrLeaves";
// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function HR() {
  return (
    <>
      <HrSideBar />

      <Routes>
        <Route path="/" element={<HrMain />} />
        <Route path="employee/*" element={<HrEmployee />} />
        <Route path="attendance/*" element={<HrAttendance />} />
        <Route path="leaves/*" element={<HrLeaves />} />
      </Routes>
    </>
  );
}

export default HR;

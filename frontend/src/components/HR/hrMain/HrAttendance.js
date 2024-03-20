import React from "react";
import "./hrMain.css";
import HrPageTitle from "./HRPageTitle";
import Attendance from "./Attendance";
import AddEmp from "./AddEmp";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function HrAttendance() {
  return (
    <main id="main" className="main">
      <HrPageTitle title="Attendance" url="hr/attendance" />

      <Routes>
        <Route path="/" element={<Attendance />} />
        <Route path="add" element={<AddEmp />} />
      </Routes>
    </main>
  );
}

export default HrAttendance;

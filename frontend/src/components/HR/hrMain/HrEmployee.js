import React from "react";
import "./hrMain.css";
import HrPageTitle from "./HRPageTitle";
import AddEmp from "./AddEmp";
import EmpDash from "./EmpDash";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function HrEmployee() {
  return (
    <main id="main" className="main">
      <HrPageTitle title="Employee" url="staff/hr/employee" />

      <Routes>
        <Route path="/" element={<EmpDash />} />
        <Route path="add" element={<AddEmp />} />
      </Routes>
    </main>
  );
}

export default HrEmployee;

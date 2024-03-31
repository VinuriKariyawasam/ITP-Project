import React from "react";
import "./hrMain.css";
import HrPageTitle from "./HRPageTitle";
import Salary from "./Salary";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function HrSalary() {
  return (
    <main id="main" className="main">
      <HrPageTitle title="Salary" url="staff/hr/salary" />

      <Routes>
        <Route path="/" element={<Salary />} />
      </Routes>
    </main>
  );
}

export default HrSalary;

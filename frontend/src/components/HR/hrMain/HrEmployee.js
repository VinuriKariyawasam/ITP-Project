import React from "react";
import "./hrMain.css";
import HrPageTitle from "./HRPageTitle";
import AddEmp from "./AddEmp";
import EmpDash from "./EmpDash";
import EmployeeDetails from "./EmployeeDetails";
import ArchivedEmployeeList from "./ArchivedEmployeeList";

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
        <Route path="empDetails/:employeeId" element={<EmployeeDetails />} />
        <Route path="archived-employees" element={<ArchivedEmployeeList />} />
      </Routes>
    </main>
  );
}

export default HrEmployee;

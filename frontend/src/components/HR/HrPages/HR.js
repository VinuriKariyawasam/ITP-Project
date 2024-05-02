import React from "react";
import HrMain from "../hrMain/HrMain";
import HrSideBar from "../hrSidebar/HrSideBar";
import HrEmployee from "../hrMain/HrEmployee";
import HrAttendance from "../hrMain/HrAttendance";
import HrLeaves from "../hrMain/HrLeaves";
import HrSalary from "../hrMain/HrSalary";
import HrConfigs from "../hrMain/HrConfigs";
// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function HR({ toggleLoading }) {
  return (
    <>
      <HrSideBar />

      <Routes>
        <Route path="/" element={<HrMain />} />
        <Route
          path="employee/*"
          element={<HrEmployee toggleLoading={toggleLoading} />}
        />
        <Route
          path="salary/*"
          element={<HrSalary toggleLoading={toggleLoading} />}
        />
        <Route path="attendance/*" element={<HrAttendance />} />
        <Route path="leaves/*" element={<HrLeaves />} />
        <Route path="configs/*" element={<HrConfigs />} />
      </Routes>
    </>
  );
}

export default HR;

import React from "react";
import "./hrMain.css";
import HrPageTitle from "./HRPageTitle";
import Leaves from "./Leaves";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AddLeave from "./AddLeave";

function HrLeaves({ toggleLoading }) {
  return (
    <main id="main" className="main">
      <HrPageTitle title="Leaves" url="staff/hr/leaves" />

      <Routes>
        <Route path="/" element={<Leaves toggleLoading={toggleLoading} />} />
        <Route
          path="/add"
          element={<AddLeave toggleLoading={toggleLoading} />}
        />
      </Routes>
    </main>
  );
}

export default HrLeaves;

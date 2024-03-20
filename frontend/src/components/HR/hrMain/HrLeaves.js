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

function HrLeaves() {
  return (
    <main id="main" className="main">
      <HrPageTitle title="Leaves" url="hr/leaves" />

      <Routes>
        <Route path="/" element={<Leaves />} />
      </Routes>
    </main>
  );
}

export default HrLeaves;

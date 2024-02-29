import React from "react";
import "./hrMain.css";
import HrDashboard from "./HrDashboard";
import HrPageTitle from "./HRPageTitle";

function HrMain() {
  return (
    <main id="main" className="main">
      <HrPageTitle />
      <HrDashboard />
    </main>
  );
}

export default HrMain;

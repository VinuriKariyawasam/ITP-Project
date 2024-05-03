import React from "react";
import "./hrMain.css";
import HrDashboard from "./HrDashboard";
import HrPageTitle from "./HRPageTitle";

function HrMain({ toggleLoading }) {
  return (
    <main id="main" className="main">
      <HrPageTitle title="Employee Management Dashboard" url="/hr/" />
      <HrDashboard toggleLoading={toggleLoading} />
    </main>
  );
}

export default HrMain;

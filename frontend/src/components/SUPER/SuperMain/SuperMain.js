import React from "react";
import "./superMain.css";
import SuperDashboard from "./SuperDashboard";
import SuperPageTitle from "./SUPERPageTitle";

function SuperMain() {
  return (
    <main id="main" className="main">
      <SuperPageTitle title="Vehicle Registration Dashboard" url="/super/" />
      <SuperDashboard />
    </main>
  );
}

export default SuperMain;

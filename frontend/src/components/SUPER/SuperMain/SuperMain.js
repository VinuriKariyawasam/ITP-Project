import React from "react";
import "./superMain.css";
import SuperDashboard from "./SuperDashboard";
import SuperPageTitle from "./SUPERPageTitle";

function SuperMain() {
  return (
    <main id="main" className="main">
      <SuperPageTitle title="Supervisor Dashboard" url="/supervisor/" />
      <SuperDashboard />
    </main>
  );
}

export default SuperMain;

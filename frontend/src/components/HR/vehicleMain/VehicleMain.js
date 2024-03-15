import React from "react";
import "./vehicleMain.css";
import VehicleDashboard from "./VehicleDashboard";
import VehiclePageTitle from "./VehiclePageTitle";

function VehicleMain() {
  return (
    <main id="main" className="main">
      <VehiclePageTitle title="Employee Management Dashboard" url="/vehicle/" />
      <VehicleDashboard />
    </main>
  );
}

export default VehicleMain;

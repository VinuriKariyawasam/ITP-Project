//register vehicle button linking
import React from "react";
import "./superMain.css";
import SuperPageTitle from "./SUPERPageTitle";
import AddVehicle from "./AddVehicle";
import VehicleDash from "./VehicleDash";

// Import front end routes
import {
  Routes,
  Route,
} from "react-router-dom";

function SuperVehicle() {
  return (
    <main id="main" className="main">
      <SuperPageTitle title="Vehicle" url="supervisor/vehicle/" />

      <Routes>
        <Route path="/" element={<VehicleDash />} />
        <Route path="/add" element={<AddVehicle />} />
      </Routes>
    </main>
  );
}

export default SuperVehicle;

import React from "react";
import "./SuperMain.css";
import SuperPageTitle from "./SUPERPageTitle";
import AddVehicle from "./AddVehicle";
import VehicleDash from "./VehicleDash";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function SuperVehicle() {
  return (
    <main id="main" className="main">
      <SuperPageTitle title="Vehicle" url="super/vehicle" />

      <Routes>
        <Route path="/" element={<VehicleDash />} />
        <Route path="add" element={<AddVehicle />} />
      </Routes>
    </main>
  );
}

export default SuperVehicle;
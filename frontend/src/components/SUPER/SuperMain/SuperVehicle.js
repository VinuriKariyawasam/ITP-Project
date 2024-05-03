import React from "react";
import "./superMain.css";
import SuperPageTitle from "./SUPERPageTitle";
import AddVehicle from "./AddVehicle";
import VehicleDash from "./VehicleDash";

import { Routes, Route, Navigate } from "react-router-dom";

function SuperVehicle({ toggleLoading }) {
  return (
    <main id="main" className="main">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SuperPageTitle title="Vehicle" url="staff/supervisor/vehicle/" />
              <VehicleDash toggleLoading={toggleLoading} />
            </>
          }
        />
        <Route
          path="/add"
          element={
            <>
              <SuperPageTitle title="Vehicle" url="staff/supervisor/vehicle/" />
              <AddVehicle toggleLoading={toggleLoading} />
            </>
          }
        />

        {/* Redirect to the vehicle page if an invalid route is provided */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default SuperVehicle;

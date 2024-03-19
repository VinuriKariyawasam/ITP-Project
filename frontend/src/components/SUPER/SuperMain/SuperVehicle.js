import React from "react";
import "./superMain.css";
import SuperPageTitle from "./SUPERPageTitle";
import AddVehicle from "./AddVehicle";
import VehicleDash from "./VehicleDash";
import UpdateVehicle from "./UpdateVehicle";
import { Routes, Route, Navigate } from "react-router-dom";

function SuperVehicle() {
  return (
    <main id="main" className="main">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SuperPageTitle title="Vehicle" url="supervisor/vehicle/" />
              <VehicleDash />
            </>
          }
        />
        <Route
          path="/add"
          element={
            <>
              <SuperPageTitle title="Vehicle" url="supervisor/vehicle/" />
              <AddVehicle />
            </>
          }
        />
        <Route
          path="/update/*"
          element={
            <>
              <SuperPageTitle title="Update Records" url="supervisor/vehicle/update" />
              <UpdateVehicle />
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
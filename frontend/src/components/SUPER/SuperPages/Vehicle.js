import React from "react";
import VehicleMain from "../SuperMain/VehicleMain";
import VehicleSideBar from "../SuperSidebar/VehicleSideBar";

//Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

function SUPER() {
  return (
    <>
      <SuperSideBar />

      <Routes>
        <Route path="/" element={<SuperMain />} />
        <Route path="employee/*" element={<SuperVehicle />} />
      </Routes>
    </>
  );
}

export default HR;

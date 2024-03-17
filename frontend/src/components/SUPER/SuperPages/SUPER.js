import React from "react";
import SuperMain from "../SuperMain/SuperMain";
import SuperVehicle from "../SuperMain/SuperVehicle";
import SuperSideBar from "../SuperSidebar/SuperSideBar";
import VehicleDash from "../SuperMain/VehicleDash";

// Import front end routes
import {
  //BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function SUPERVISOR() {
  return (
    <>
   
      <SuperSideBar />
      <Routes>
        <Route path="/" element={<SuperMain />} />
        <Route path="vehicle/*" element={<SuperVehicle />} />
      </Routes>
   
    </>
  );
}

export default SUPERVISOR;

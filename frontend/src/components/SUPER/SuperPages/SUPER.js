import React from "react";
import SuperMain from "../SuperMain/SuperMain";
import SuperVehicle from "../SuperMain/SuperVehicle";
import SuperSideBar from "../SuperSidebar/SuperSideBar";

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
        <Route path="supervisor/*" element={<SuperVehicle />} />
      </Routes>
   
    </>
  );
}

export default SUPERVISOR;

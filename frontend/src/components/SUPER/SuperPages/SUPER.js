import React from "react";
import SuperMain from "../SuperMain/SuperMain";
import SuperVehicle from "../SuperMain/SuperVehicle";
import SuperSideBar from "../SuperSidebar/SuperSideBar";
import SuperServiceReq from "../SuperMain/SuperServiceReq";
import SuperProducts from "../SuperMain/SuperProducts";
import Shedules from "../../SM/SMmain/SMAppointment/Shedules";

// Import front end routes
import {
  //BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function SUPERVISOR() {
  return (
    <main>

      <SuperSideBar />
      <Routes>
        <Route path="/" element={<SuperMain />} />
        <Route path="vehicle/*" element={<SuperVehicle />} />
        <Route path="serviceReq/*" element={<SuperServiceReq />} />
        <Route path="products/*" element={<SuperProducts />} />
        <Route path="shedules/*" element={<Shedules />} />
      </Routes>
   
    </main>
  );
}

export default SUPERVISOR;

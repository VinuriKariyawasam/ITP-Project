import React from "react";
import SuperMain from "../SuperMain/SuperMain";
import SuperVehicle from "../SuperMain/SuperVehicle";
import SuperSideBar from "../SuperSidebar/SuperSideBar";
import SuperServiceReq from "../SuperMain/SuperServiceReq";
import UpdateVehicle from "../SuperMain/UpdateVehicle";
import Sujob from "../SuperMain/Job/sujob";
import SuperProducts from "../SuperMain/SuperProducts";
import Shedules from "../../SM/SMmain/SMAppointment/Shedules";
import SuperRecords from "../SuperMain/SuperRecords";
import SuperQuotation from "../SuperMain/SuperQuotation";


// Import front end routes
import {
  //BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function SUPERVISOR({ toggleLoading }) {
  return (
    <main>

      <SuperSideBar />
      <Routes>
        <Route path="/" element={<SuperMain />} />
        <Route path="vehicle/*" element={<SuperVehicle />} />
        <Route path="serviceReq/*" element={<SuperServiceReq />} />
        <Route path="jobs/*" element={<Sujob toggleLoading={toggleLoading}/>} />
        <Route path="products/*" element={<SuperProducts />} />
        <Route path="shedules/*" element={<Shedules />} />
        <Route path="records/*" element={<SuperRecords />} />
        <Route path="quotation/*" element={<SuperQuotation />} />

      </Routes>
   
    </main>
  );
}

export default SUPERVISOR;

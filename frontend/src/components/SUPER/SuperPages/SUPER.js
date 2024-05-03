import React from "react";
import SuperMain from "../SuperMain/SuperMain";
import SuperVehicle from "../SuperMain/SuperVehicle";
import SuperSideBar from "../SuperSidebar/SuperSideBar";
import SuperServiceReq from "../SuperMain/SuperServiceReq";

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
        <Route path="/" element={<SuperMain toggleLoading={toggleLoading} />} />
        <Route
          path="vehicle/*"
          element={<SuperVehicle toggleLoading={toggleLoading} />}
        />
        <Route
          path="serviceReq/*"
          element={<SuperServiceReq toggleLoading={toggleLoading} />}
        />
        <Route
          path="jobs/*"
          element={<Sujob toggleLoading={toggleLoading} />}
        />
        <Route
          path="products/*"
          element={<SuperProducts toggleLoading={toggleLoading} />}
        />
        <Route
          path="shedules/*"
          element={<Shedules toggleLoading={toggleLoading} />}
        />
        <Route
          path="records/*"
          element={<SuperRecords toggleLoading={toggleLoading} />}
        />
        <Route
          path="quotation/*"
          element={<SuperQuotation toggleLoading={toggleLoading} />}
        />
      </Routes>
    </main>
  );
}

export default SUPERVISOR;

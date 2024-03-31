// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import React and React Router
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import HR from "./components/HR/HrPages/HR";
import SM from "./components/SM/SMpages/SM";
import Finance from "./components/Finance/FinancePages/Finance";
import Common from "./components/Pages/Common";
import SUPER from "./components/SUPER/SuperPages/SUPER";
import IM from "./components/IM/IMPages/IM";
import CAM from "./components/CAM/CAM_pages/CAM";

function StaffApp() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Common />} />
        <Route path="/hr/*" element={<HR />} />
        <Route path="/sm/*" element={<SM />} />
        <Route path="/finance/*" element={<Finance />} />
        <Route path="/supervisor/*" element={<SUPER />} />
        <Route path="/im/*" element={<IM />} />
        <Route path="/CAM/*" element={<CAM/>}/>
      </Routes>
    </>
  );
}


export default StaffApp;
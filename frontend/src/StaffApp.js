// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import React and React Router
import React, { useContext } from "react";
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
import StaffFooter from "./components/Staff/StaffFooter";
import StaffLogin from "./components/Staff/staff-login";
import { StaffAuthProvider } from "./Context/Staff/StaffAuthContext";
import { StaffAuthContext } from "./Context/Staff/StaffAuthContext";

function StaffApp() {
  const { userPosition } = useContext(StaffAuthContext);

  return (
    <>
      <StaffAuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<StaffLogin />} />
          {userPosition === "HR Manager" && (
            <Route path="/hr/*" element={<HR />} />
          )}
          {userPosition === "Sales Manager" && (
            <Route path="/sm/*" element={<SM />} />
          )}
          {userPosition === "Finance Manager" && (
            <Route path="/finance/*" element={<Finance />} />
          )}
          <Route path="/gm/*" element={<Common />} />
          <Route path="/supervisor/*" element={<SUPER />} />
          <Route path="/im/*" element={<IM />} />
          <Route path="/cam/*" element={<CAM />} />
        </Routes>
        <StaffFooter />
      </StaffAuthProvider>
    </>
  );
}

export default StaffApp;

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

import { StaffAuthContext } from "./Context/Staff/StaffAuthContext";

function StaffApp() {
  const { userPosition, isLoggedIn } = useContext(StaffAuthContext);
  return (
    <>
      <Header />
      <Routes>
        {isLoggedIn === false && (
          <Route path="/login" element={<StaffLogin />} />
        )}

        {userPosition === "HR Manager" && (
          <Route path="/hr/*" element={<HR />} />
        )}
        {userPosition === "Service Manager" && (
          <Route path="/sm/*" element={<SM />} />
        )}
        {userPosition === "Finance Manager" && (
          <Route path="/finance/*" element={<Finance />} />
        )}
        {userPosition === "General Manager" && (
          <Route path="/gm/*" element={<Common />} />
        )}
        {userPosition === "Supervisor" && (
          <Route path="/supervisor/*" element={<SUPER />} />
        )}
        {userPosition === "Inventory Manager" && (
          <Route path="/im/*" element={<IM />} />
        )}
        {userPosition === "Customer Service Agent" && (
          <Route path="/cam/*" element={<CAM />} />
        )}
      </Routes>
      <StaffFooter />
    </>
  );
}

export default StaffApp;

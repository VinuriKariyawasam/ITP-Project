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
import RestrictedPage from "./components/util/RestrictedPage";
import { StaffAuthContext } from "./Context/Staff/StaffAuthContext";
import GM from "./components/GM/GMPages/GM";


function StaffApp() {
  const { userPosition, isLoggedIn } = useContext(StaffAuthContext);
  return (
    <>
      <Header />
      <Routes>

        {isLoggedIn === false && (
          <Route path="/login" element={<StaffLogin />} />
        )}

        <Route path="/gm/*" element={<GM />} />

        {userPosition === "HR Manager" ? (
          <Route path="/hr/*" element={<HR />} />
        ) : (
          <Route path="/hr/*" element={<RestrictedPage />} />
        )}
        {userPosition === "Service Manager" ? (
          <Route path="/sm/*" element={<SM />} />
        ) : (
          <Route path="/sm/*" element={<RestrictedPage />} />
        )}

        {userPosition === "Finance Manager" ? (
          <Route path="/finance/*" element={<Finance />} />
        ) : (
          <Route path="/finance/*" element={<RestrictedPage />} />
        )}

        {userPosition === "Supervisor" ? (
          <Route path="/supervisor/*" element={<SUPER />} />
        ) : (
          <Route path="/supervisor/*" element={<RestrictedPage />} />
        )}

        {userPosition === "Inventory Manager" ? (
          <Route path="/im/*" element={<IM />} />
        ) : (
          <Route path="/im/*" element={<RestrictedPage />} />
        )}

        {userPosition === "Customer Service Agent" ? (
          <Route path="/cam/*" element={<CAM />} />
        ) : (
          <Route path="/cam/*" element={<RestrictedPage />} />
        )}
      </Routes>

      <StaffFooter />
    </>
  );
}

export default StaffApp;

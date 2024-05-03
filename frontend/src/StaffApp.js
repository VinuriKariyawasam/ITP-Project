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
import { StaffAuthContext } from "./context/StaffAuthContext";
import GM from "./components/GM/GMPages/GM";
import AlreadyLogIn from "./components/util/AlreadyLogIn";
import StaffMyProfile from "./components/Staff/staffMyProfile";
import NotFoundPage from "./components/util/NotFoundPage";

function StaffApp({ toggleLoading }) {
  const { userId, userPosition, isLoggedIn } = useContext(StaffAuthContext);
  const frontendurl = `${process.env.React_App_Frontend_URL}/`;
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<NotFoundPage page={frontendurl} />} />

        {isLoggedIn === false ? (
          <Route
            path="/login"
            element={<StaffLogin toggleLoading={toggleLoading} />}
          />
        ) : (
          <Route path="/login" element={<AlreadyLogIn />} />
        )}

        {isLoggedIn === true ? (
          <Route
            path="/staffprofile"
            element={
              <StaffMyProfile userId={userId} toggleLoading={toggleLoading} />
            }
          />
        ) : (
          <Route path="/staffprofile" element={<AlreadyLogIn />} />
        )}

        {userPosition === "General Manager" ? (

          <Route path="/gm/*" element={<GM toggleLoading={toggleLoading} />} />

        ) : (
          <Route path="/gm/*" element={<RestrictedPage />} />
        )}

        {userPosition === "HR Manager" || userPosition === "General Manager" ? (
          <Route path="/hr/*" element={<HR toggleLoading={toggleLoading} />} />
        ) : (
          <Route path="/hr/*" element={<RestrictedPage />} />
        )}
        {userPosition === "Service Manager" ||
        userPosition === "General Manager" ? (

          <Route path="/sm/*" element={<SM toggleLoading={toggleLoading}/>} />


        ) : (
          <Route path="/sm/*" element={<RestrictedPage />} />
        )}

        {userPosition === "Finance Manager" ||
        userPosition === "General Manager" ? (
          <Route path="/finance/*" element={<Finance toggleLoading={toggleLoading}/>} />
        ) : (
          <Route path="/finance/*" element={<RestrictedPage />} />
        )}

        {userPosition === "Supervisor" || userPosition === "General Manager" ? (
          <Route path="/supervisor/*" element={<SUPER toggleLoading={toggleLoading}/>} />
        ) : (
          <Route path="/supervisor/*" element={<RestrictedPage />} />
        )}

        {userPosition === "Inventory Manager" ||
        userPosition === "General Manager" ? (
          <Route path="/im/*" element={<IM toggleLoading={toggleLoading}/>} />
        ) : (
          <Route path="/im/*" element={<RestrictedPage />} />
        )}

        {userPosition === "Customer Service Agent" ||
        userPosition === "General Manager" ? (
          <Route path="/cam/*" element={<CAM toggleLoading={toggleLoading}/>} />
        ) : (
          <Route path="/cam/*" element={<RestrictedPage />} />
        )}
      </Routes>

      <StaffFooter />
    </>
  );
}

export default StaffApp;

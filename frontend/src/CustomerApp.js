// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import React and React Router
import React from "react";
import Mechanicalreq from '../src/components/CUS/MobileReqMain/Mobilereq/Mechanicalreq';
import Header from '../src/components/CUS/CusHeader/Header'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";



function CustomerApp() {
  return (
    <div>

      <Header />
      <Routes>
        <Route path="/Mechanical" element={<Mechanicalreq />} />
      </Routes>

    </div>
  );
}

export default CustomerApp;
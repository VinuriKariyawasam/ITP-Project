// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import React and React Router
import React from "react";
import Header from "../src/components/CUS/CusHeader/Header";
import CUSAffairs from "./components/CUS/Pages/CUSAffairs";
import CUSAppointment from "./components/CUS/Pages/CUSAppointment";
import Payment from "./components/CUS/Pages/Payment";
import Mechanicalreq from "../src/components/CUS/CUSMain/CUSMobileReq/Mechanicalreq";
import Products from "../src/components/CUS/Pages/Product";
import Cushome from "../src/components/CUS/CUSMain/Cushome";
import CusRegistration from "./components/CUS/CUSMain/CusRegistration";
import CusLogin from "./components/CUS/CUSMain/CusLogin";
import CusProfile from "./components/CUS/CUSMain/CusProfile";

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
        <Route path="/"></Route>
        //products-Tharindu
        <Route path="/*" element={<Cushome />} />
        <Route path="/products/*" element={<Products />} />
        //appointments-Nihinsa
        <Route path="/appointment/*" element={<CUSAppointment />} />
        // payments -kavinda
        <Route path="/payments/*" element={<Payment />} />
        //customer affair-Githadi

        <Route path="/cusaffairs/*" element={<CUSAffairs/>}></Route>
        <Route path="/cusreg/*" element={<CusRegistration/>}></Route>
        <Route path="/cuslogin/*" element={<CusLogin/>}></Route>
        <Route path="/myprofile/*" element={<CusProfile/>}></Route>
       
        //Mobile service-Isiri
        <Route path="/Mechanical" element={<Mechanicalreq />} />

      </Routes>
    </div>
  );
}

export default CustomerApp;

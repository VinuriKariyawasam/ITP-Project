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

import Feedback from "./components/CUS/CUSMain/CUS_CAM/Feedback";
import OnlineConsultation from "./components/CUS/CUSMain/CUS_CAM/OnlineConsultation";
import MyFeedback from "./components/CUS/CUSMain/CUS_CAM/MyFeedback";
import AllFeedbacks from "./components/CUS/CUSMain/CUS_CAM/AllFeedbacks";
//import FeedbackMain from './components/CUS/CUSMain/CUS_CAM/FeedbackMain';
import Mechanicalreq from '../src/components/CUS/CUSMain/CUSMobileReq/Mechanicalreq';
import VehicleCarrReq from '../src/components/CUS/CUSMain/CUSMobileReq/VehicleCarrierReq'

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
import CusFooter from "../src/components/CUS/CusFooter/CusFooter";




function CustomerApp() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Cushome />} />
        //products-Tharindu
        <Route path="/products/*" element={<Products />} />
        //appointments-Nihinsa
        <Route path="/appointment/*" element={<CUSAppointment />} />
        // payments -kavinda
        <Route path="/payments/*" element={<Payment />} />
        //customer affair-Githadi
        <Route path="/cusaffairs/*" element={<CUSAffairs />} />
        //Mobile service-Isiri

        <Route path="/mobilemechanical" element={<Mechanicalreq />} />
        <Route path="/vehiclecarriers" element={<VehicleCarrReq/>} />


      </Routes>
      <CusFooter />
    </div>
  );
}

export default CustomerApp;

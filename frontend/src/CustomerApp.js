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
import MobileService from "./components/CUS/Pages/Mobile";

import Feedback from "./components/CUS/CUSMain/CUS_CAM/Feedback";
import OnlineConsultation from "./components/CUS/CUSMain/CUS_CAM/OnlineConsultation";
import MyFeedback from "./components/CUS/CUSMain/CUS_CAM/MyFeedback";
import AllFeedbacks from "./components/CUS/CUSMain/CUS_CAM/AllFeedbacks";
//import FeedbackMain from './components/CUS/CUSMain/CUS_CAM/FeedbackMain';

import Products from "../src/components/CUS/Pages/Product";
import Cushome from "../src/components/CUS/CUSMain/Cushome";


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
        <Route path="/mobservices/*" element={<MobileService />} />



       

      </Routes>
    </div>
  );
}

export default CustomerApp;

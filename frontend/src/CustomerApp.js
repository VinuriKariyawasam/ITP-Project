// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import React and React Router
import React from "react";
import Header from "../src/components/CUS/CusHeader/Header";
import CUSAppointment from "./components/CUS/Pages/CUSAppointment";
import Payment from "./components/CUS/Pages/Payment";
import Feedback from "./components/CUS/CUSMain/CUS_CAM/Feedback";
import OnlineConsultation from "./components/CUS/CUSMain/CUS_CAM/OnlineConsultation";
import MyFeedback from "./components/CUS/CUSMain/CUS_CAM/MyFeedback";
import AllFeedbacks from "./components/CUS/CUSMain/CUS_CAM/AllFeedbacks";
//import FeedbackMain from './components/CUS/CUSMain/CUS_CAM/FeedbackMain';
import Mechanicalreq from "../src/components/CUS/CUSMain/CUSMobileReq/Mechanicalreq";
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
        //products-Tharindu
        <Route path="/*" element={<Cushome />} />
        <Route path="/products/*" element={<Products />} />
        //appointments-Nihinsa
        <Route path="/appointment/*" element={<CUSAppointment />} />
        // payments -kavinda
        <Route path="/payments/*" element={<Payment />} />
        //customer affair-Githadi
        <Route path="/allfeedback/*" element={<AllFeedbacks />}></Route>
        <Route path="/feedback" element={<Feedback />}></Route>
        <Route path="/myfeedback/*" element={<MyFeedback />}></Route>
        <Route path="/consultation/*" element={<OnlineConsultation />}></Route>
        //Mobile service-Isiri
        <Route path="/Mechanical" element={<Mechanicalreq />} />
      </Routes>
    </div>
  );
}

export default CustomerApp;

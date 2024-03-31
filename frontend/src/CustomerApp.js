// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import React and React Router
import React from "react";
import PeriodicalAppointment from "../src/components/CUS/CUSMain/CUSAppointment/PeriodicalAppointment";
import Header from "../src/components/CUS/CusHeader/Header";
//import MyAppointment from "./components/CUS/CUSMain/CUSAppointment/MyAppointment";
import Products from "./components/CUS/inventory/Products";
import Feedback from "./components/CUS/CUSMain/CUS_CAM/Feedback";
import OnlineConsultation from "./components/CUS/CUSMain/CUS_CAM/OnlineConsultation";
import MyFeedback from "./components/CUS/CUSMain/CUS_CAM/MyFeedback";
import AllFeedbacks from "./components/CUS/CUSMain/CUS_CAM/AllFeedbacks";
//import FeedbackMain from './components/CUS/CUSMain/CUS_CAM/FeedbackMain';

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
        <Route path="/products" element={<Products />} />
        //appointments-Nihinsa
        <Route path="/Periodical" element={<PeriodicalAppointment />} />
        //customer affair-Githadi
        <Route path="/allfeedback/*" element={<AllFeedbacks />}></Route>
        <Route path="/feedback" element={<Feedback />}></Route>
        <Route path="/myfeedback/*" element={<MyFeedback />}></Route>
        <Route path="/consultation/*" element={<OnlineConsultation />}></Route>
      </Routes>
    </div>
  );
}

export default CustomerApp;

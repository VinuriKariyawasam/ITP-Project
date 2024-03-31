
// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import React and React Router
import React from "react";
//import PeriodicalAppointment from '../src/components/CUS/CUSMain/CUSAppointment/PeriodicalAppointment'
import Header from '../src/components/CUS/CusHeader/Header'
//import MyAppointment from "./components/CUS/CUSMain/CUSAppointment/MyAppointment";
import Feedback from "./components/CUS/CUSMain/CUS_CAM/Feedback";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Customer from "./components/CUS/Pages/Customer";




function CustomerApp() {
  return (
    <div>

       <Header/>
    <Routes>
    <Route path="/CUS_CAM/*" element={<Customer/>}> </Route>
    
    
    </Routes>

    </div>
  );
}

export default CustomerApp;

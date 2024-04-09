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
import CUSAffairs from "./components/CUS/Pages/CUSAffairs";


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
        <Route path="/products" element={<Products />} />
        //appointments-Nihinsa
        <Route path="/Periodical" element={<PeriodicalAppointment />} />
        //customer affair-Githadi
        <Route path="/cusaffairs/*" element={<CUSAffairs/>}></Route>
      </Routes>
    </div>
  );
}

export default CustomerApp;

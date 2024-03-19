

// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import React and React Router
import React from "react";
import PeriodicalAppointment from '../src/components/CUS/CUSMain/CUSAppointment/PeriodicalAppointment'
import Header from '../src/components/CUS/CusHeader/Header'
import MyAppointment from "./components/CUS/CUSMain/CUSAppointment/MyAppointment";
import Products from './components/CUS/inventory/Products'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";



function CustomerApp() {
  return (
    <div>

       <Header/>
    <Routes>
    <Route path="/Periodical" element={<PeriodicalAppointment/>} />
    <Route path="/MyAppointment" element={<MyAppointment/>} />
    <Route path="/products" element={<Products/>} />
    </Routes>

    </div>
  );
}

export default CustomerApp;

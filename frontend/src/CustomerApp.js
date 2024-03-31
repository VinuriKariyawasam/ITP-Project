
// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import React and React Router
import React from "react";
import PeriodicalAppointment from '../src/components/CUS/CUSMain/CUSAppointment/PeriodicalAppointment'
import Products from "./components/CUS/inventory/Products";
import Payment from "./components/CUS/Pages/Payment"
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
        <Route path="/products" element={<Products />} />
        <Route path="/Periodical" element={<PeriodicalAppointment />} />
        <Route path="/payments/*" element={<Payment />} />
        
      </Routes>

    </div>
  );
}

export default CustomerApp;


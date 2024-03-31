
// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import React and React Router
import React from "react";
import CUSAppointment from "./components/CUS/Pages/CUSAppointment"
import Products from "./components/CUS/inventory/Products";
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
        <Route path="/appointment/*" element={<CUSAppointment />} />
      </Routes>

    </div>
  );
}

export default CustomerApp;


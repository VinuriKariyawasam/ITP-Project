// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import React and React Router
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";

import StaffApp from "./StaffApp";
import CustomerApp from "./CustomerApp";
import Common from "./components/Pages/Common";
import Invoice from "./components/CUS/CUSMain/CustomerPayments/PaymentInvoice";


function App() {
  return (
    <>
       <Router>
        <Routes>
          <Route path="/" element={<Common />} />
          <Route path="/staff/*" element={<StaffApp />} />
          <Route path="/customer/*" element={<CustomerApp />} />
          <Route path="/invoice" element={<Invoice/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
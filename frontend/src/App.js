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
import Header from "./components/Header/Header";
import HR from "./components/HR/HrPages/HR";
import Finance from "./components/Finance/FinancePages/Finance";
import Common from "./components/Pages/Common";
import StaffApp from "./StaffApp";
import CustomerApp from "./CustomerApp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Common />} />
          <Route path="/staff/*" element={<StaffApp />} />
          <Route path="/customer/*" element={<CustomerApp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

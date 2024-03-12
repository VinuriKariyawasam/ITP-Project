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

import HR from "./components/HR/HrPages/HR";
import Common from "./components/Pages/Common";
import SM from "./components/SM/SMpages/SM";
import Customer from "./components/CUS/Pages/Customer";

function App() {
  return (
    <>
     
      <Router>
        <Routes>
          <Route path="/" element={<Common />} />
          <Route path="/hr/*" element={<HR />} />
          <Route path="/sm/*" element={<SM />} />
          <Route path="/customer" element={<Customer/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

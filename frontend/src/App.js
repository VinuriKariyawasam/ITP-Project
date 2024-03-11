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
import Finance from "./components/Finance/FinancePages/Finance"
import Common from "./components/Pages/Common";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Common />} />
          <Route path="/hr/*" element={<HR />} />
          <Route path="/finance/*" element={<Finance/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

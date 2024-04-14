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
import { StaffAuthProvider } from "./Context/Staff/StaffAuthContext";
import HomePage from "./components/util/HomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/staff/*"
            element={
              <StaffAuthProvider>
                <StaffApp />
              </StaffAuthProvider>
            }
          />

          <Route path="/customer/*" element={<CustomerApp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

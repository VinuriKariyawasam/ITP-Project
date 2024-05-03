// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import React and React Router
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import StaffApp from "./StaffApp";
import CustomerApp from "./CustomerApp";
import { StaffAuthProvider } from "./context/StaffAuthContext";
import HomePage from "./components/util/HomePage";

import Loader from "./components/util/Loader";


function App() {
  const [loading, setLoading] = useState(false); // State to track loading status

  // Function to toggle loading state
  const toggleLoading = (status) => {
    setLoading(status);
  };
  return (
    <>
      {loading && <Loader />} {/* Display loader if loading is true */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/staff/*"
            element={
              <StaffAuthProvider>
                <StaffApp toggleLoading={toggleLoading} />
              </StaffAuthProvider>
            }
          />


          <Route
            path="/customer/*"
            element={<CustomerApp toggleLoading={toggleLoading} />}
          />

          <Route path="/loader" element={<Loader />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
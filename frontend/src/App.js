// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import React and React Router
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import SUPER from "./components/SUPER/SuperPages/SUPER";
import Common from "./components/Pages/Common";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes> {/* Wrap your routes in <Routes> */}
          <Route path="/" element={<Common />} />
          <Route path="/supervisor/*" element={<SUPER />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;


//link****************************************
// Import icons and Bootstrap
import React from "react";
import SuperMain from "../superMain/SuperMain";
import SuperSideBar from "../superSidebar/SuperSideBar";
import SuperVehicle from "../superMain/SuperVehicle";

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
import Vehicle from "./components/Vehicle/SuperPages/Vehicle";
import Common from "./components/Pages/Common";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Common />} />
          <Route path="/SUPER/*" element={<Vehicle />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
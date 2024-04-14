import React from "react";
import Header from "../../Header/Header";
import GMMain from "../GMMain/GMMain";
import GMSideBar from "../GMSidebar/GMSideBar";

// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function GM() {
  return (
    <>
     <Header />
      <GMSideBar />

      <Routes>
        <Route path="/" element={<GMMain />} />
       
      </Routes>
    </>
  );
}

export default GM;

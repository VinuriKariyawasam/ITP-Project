import React from "react";
import IMMain from "../IMMain/IMMain";
import IMSideBar from "../IMSidebar/IMSideBar";


// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


function IM() {
  return (
    <>
      
      <IMSideBar />
      <Routes>
        <Route path="/" element={<IMMain />} />
        
      </Routes>
    </>
  );
}

export default IM;

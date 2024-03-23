import React from "react";
import SMSidebar from "../SMsidebar/SMSidebar"
import SMMain from "../SMmain/SMService/SMMain"
import Smrecords from "../SMmain/SMService/Smrecords"
import Header from "../../Header/Header";


// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


function SM() {
  return (
    <>
      <SMSidebar />
       <Header> </Header>
      <Routes>
        <Route path="/" element={<SMMain/>} />
       
 /*Add udara's route here*/
        <Route path="record/*" element={<Smrecords/>} />
        

      </Routes>
    </>
  );
}

export default SM;
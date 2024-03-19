import React from "react";
import IMMain from "../IMMain/IMMain";
import IMSideBar from "../IMSidebar/IMSideBar";
import Lubricants from "../IMMain/Lubricants";
import Header from "../../Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';


// Import front end routes
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Addproducts from "../IMMain/Productform";



function IM() {
  return (
    <>
      <Header/>
      <IMSideBar />
      <Routes>
        <Route path="/*" element={<IMMain />} />
        <Route path="/lubricants/*" element={<Lubricants/>} />
        <Route path="lubricants/addproduct/" element={<Addproducts />} />
      </Routes>
    </>
  );
}
export default IM;

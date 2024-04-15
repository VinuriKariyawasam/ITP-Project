import React from "react";
import IMMain from "../IMMain/IMMain";
import IMSideBar from "../IMSidebar/IMSideBar";
import Lubricants from "../IMMain/Products/Lubricants"
import Header from "../../Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Addlubricant from "../IMMain/Products/lubform";
import Tires from "../IMMain/Products/Tires";
import Tireform from "../IMMain/Products/Tireform";
import SpareParts from "../IMMain/Products/SpareParts";
import Sales from "../IMMain/Products/Sales";

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
      <Header/>
      <IMSideBar />
      <Routes>
        <Route path="/*" element={<IMMain />} />
        <Route path="/lubricants/*" element={<Lubricants/>} />
        <Route path="lubricants/addproduct/" element={<Addlubricant />} />
        <Route path="/Tires/*" element={<Tires/>} />
        <Route path="Tires/addproduct/" element={<Tireform />} />
        <Route path="sp/*" element={<SpareParts/>} />
        <Route path="sales/*" element={<Sales/>} />
      </Routes>
    </>
  );
}
export default IM;

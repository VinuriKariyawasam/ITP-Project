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




function IM({ toggleLoading }) {
  return (
    <>
      <Header/>
      <IMSideBar />
      <Routes>
        <Route path="/*" element={<IMMain toggleLoading={toggleLoading}/>} />
        <Route path="/lubricants/*" element={<Lubricants toggleLoading={toggleLoading}/>} />
        <Route path="lubricants/addproduct/" element={<Addlubricant toggleLoading={toggleLoading}/>} />
        <Route path="/Tires/*" element={<Tires toggleLoading={toggleLoading}/>} />
        <Route path="Tires/addproduct/" element={<Tireform toggleLoading={toggleLoading}/>} />
        <Route path="sp/*" element={<SpareParts toggleLoading={toggleLoading}/>} />
        <Route path="sales/*" element={<Sales toggleLoading={toggleLoading}/>} />
      </Routes>
    </>
  );
}
export default IM;

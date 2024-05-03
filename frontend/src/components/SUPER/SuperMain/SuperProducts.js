import React from "react";
import "./superMain.css";
import SuperPageTitle from "./SUPERPageTitle";
import AddServiceReq from "./AddServiceReq";
import ServiceReqDash from "./ServiceReqDash";
import Products from "../../CUS/CUSMain/inventory/Products";



import { Routes, Route, Navigate } from "react-router-dom";

function SuperProducts({ toggleLoading }) {
    return (
      <main id="main" className="main">
        <SuperPageTitle title="Products" url="staff/supervisor/products/" />
        <Products toggleLoading={toggleLoading}/>
      </main>
    );
  }
  
  export default SuperProducts;
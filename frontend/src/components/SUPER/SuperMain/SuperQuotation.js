import React from "react";
import "./superMain.css";
import SuperPageTitle from "./SUPERPageTitle";

import QuotaDash from "../../SM/SMmain/SMService/QuotaDash";



import { Routes, Route, Navigate } from "react-router-dom";

function SuperProducts() {
    return (
      <main id="main" className="main">
        <SuperPageTitle title="Quotations" url="staff/supervisor/quotations/" />
        <QuotaDash />
      </main>
    );
  }
  
  export default SuperProducts;
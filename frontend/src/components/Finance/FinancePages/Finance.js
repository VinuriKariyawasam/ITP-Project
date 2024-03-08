import React from "react";
import FinanceMain from "../FinanceMain/FinanceMain";
import FinanceSideBar from "../FinanceSideBar/FinanceSideBar";
//import FinanceIncome from "../hrMain/HrEmployee";

// Import front end routes
import {

  Route,
  Routes,
  
} from "react-router-dom";

function Finance() {
  return (
    <>
      <FinanceSideBar />

      <Routes>
        <Route path="/" element={<FinanceMain />} />
      </Routes>
    </>
  );
}

export default Finance;

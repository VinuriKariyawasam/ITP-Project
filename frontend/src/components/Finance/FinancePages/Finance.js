import React from "react";
import FinanceMain from "../FinanceMain/FinanceMain";
import FinanceSideBar from "../FinanceSideBar/FinanceSideBar";
import Incomes from "../FinanceMain/Incomes"
//import FinanceIncome from "../hrMain/HrEmployee";

// Import front end routes
import {

  Route,
  Routes,
  
} from "react-router-dom";
import Expenses from "../FinanceMain/Expenses";

function Finance() {
  return (
    <>
      <FinanceSideBar />

      <Routes>
        <Route path="/" element={<FinanceMain />} />
        <Route path="incomes/" element={<Incomes/>} />
        <Route path="expenses/" element={<Expenses/>} />

      </Routes>
    </>
  );
}

export default Finance;

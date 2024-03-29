import React from 'react'
import Button from 'react-bootstrap/Button';


import "./Main.css";
import PageTitle from "./PageTitle";
import FinanceDashboard from "./FinanceDashboard";

function FinanceMain() {
  return (
    <main id="main" className="main">
      <PageTitle title="Finance Dashboard" />
      <FinanceDashboard />
      
    </main>
  );
}
export default FinanceMain
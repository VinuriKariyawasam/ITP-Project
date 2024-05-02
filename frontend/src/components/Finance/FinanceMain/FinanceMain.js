import React from 'react'
import Button from 'react-bootstrap/Button';


import "./Main.css";
import PageTitle from "./PageTitle";
import FinanceDashboard from "./FinanceDashboard";

function FinanceMain({toggleLoading}) {
  return (
    <main id="main" className="main">
      <PageTitle title="Finance Dashboard" />
      <FinanceDashboard  toggleLoading={toggleLoading}/>
      
    </main>
  );
}
export default FinanceMain
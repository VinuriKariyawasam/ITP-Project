import React from "react";
import FinanceMain from "../FinanceMain/FinanceMain";
import FinanceSideBar from "../FinanceSideBar/FinanceSideBar";
import Incomes from "../FinanceMain/Incomes"
import AddExpense from "../FinanceMain/AddExpense";
import UpdateExpense from "../FinanceMain/UpdateExpense";

import AddIncome from "../FinanceMain/AddIncome";
import UpdateIncome from "../FinanceMain/UpdateIncome";
import BillingForm from "../FinanceMain/BillingForm";
import BillsList from "../FinanceMain/BillsList";
import NewInvoice from "../FinanceMain/NewInvoice"
import PaymentInvoiveList from "../FinanceMain/PaymentInvoiceList";
import EmpFinance from "../FinanceMain/EmpFinance";
import ProductSales from "../FinanceMain/ProductSales";
import ServiceOrders from "../FinanceMain/ServiceOrders";
import FinancialReports from "../FinanceMain/FinancialReports";
import MonthlyReport from "../FinanceMain/MonthlyReport";


// Import front end routes
import {

  Route,
  Routes,
  
} from "react-router-dom";
import Expenses from "../FinanceMain/Expenses";

function Finance({toggleLoading}) {
  return (
    <>
      <FinanceSideBar />

      <Routes>
        <Route path="/" element={<FinanceMain toggleLoading={toggleLoading}/>} />
        
        <Route path="incomes/" element={<Incomes toggleLoading={toggleLoading}/>} />
        <Route path="incomes/add-income" element={<AddIncome toggleLoading={toggleLoading}/>}/>
        <Route path="incomes/edit-income/:id" element={<UpdateIncome toggleLoading={toggleLoading}/>} />

        <Route path="expenses/add-expense" element={<AddExpense toggleLoading={toggleLoading}/>}/>
        <Route path="expenses/" element={<Expenses toggleLoading={toggleLoading}/>} />
      
        <Route path="expenses/edit-expense/:id" element={<UpdateExpense toggleLoading={toggleLoading}/>}/>

        <Route path="billing/new" element={<BillingForm toggleLoading={toggleLoading}/>}/>
        <Route path="billing/all" element={<BillsList toggleLoading={toggleLoading}/>}/>
        <Route path="invoices/all-invoices" element={<PaymentInvoiveList toggleLoading={toggleLoading}/>}/>
        <Route path="billing/new-invoice" element={<NewInvoice toggleLoading={toggleLoading}/>}/>

        <Route path="emp-finance" element={<EmpFinance toggleLoading={toggleLoading}/>}/>
        <Route path="product-sales" element={<ProductSales toggleLoading={toggleLoading}/>}/>
      <Route path="service-orders" element={<ServiceOrders toggleLoading={toggleLoading}/>}/>
      <Route path="financial-reports" element={<FinancialReports toggleLoading={toggleLoading}/>}/>
     

      

      </Routes>
    </>
  );
}

export default Finance;

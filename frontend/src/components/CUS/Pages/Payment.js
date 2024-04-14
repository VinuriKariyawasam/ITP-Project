import React from 'react'
import Header from '../CusHeader/Header';
import PayHereIntegration from '../CUSMain/CustomerPayments/PaymentHere';
import PaymentVerification from '../CUSMain/CustomerPayments/PaymentVerification';
import PaymentFailure from '../CUSMain/CustomerPayments/PaymentFailure';
import OnlineInvoice from '../CUSMain/CustomerPayments/OnlineInvoice';
import Incomes from "../../Finance/FinanceMain/Incomes";


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function Customer() {
  return (
    <>
    
    <Routes>
    <Route path="/payonline" element={<Incomes/>} />
    <Route path="/onlinepayment/verify/*" element={<PaymentVerification/>} />
    <Route path="/onlinepayment/fail/*" element ={<PaymentFailure/>}/>
    <Route path="/onlinepayment/invoice" element ={<OnlineInvoice/>}/>
  
    </Routes>
    </>
  )
}

export default Customer

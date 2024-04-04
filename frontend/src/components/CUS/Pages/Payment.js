import React from 'react'
import Header from '../CusHeader/Header';
import PayHereIntegration from '../CUSMain/CustomerPayments/PaymentHere';
import PaymentVerification from '../CUSMain/CustomerPayments/PaymentVerification';
import PaymentFailure from '../CUSMain/CustomerPayments/PaymentFailure';
import PaymentInvoice from '../CUSMain/CustomerPayments/PaymentInvoice';
import BillingForm from '../CUSMain/CustomerPayments/BillingForm';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function Customer() {
  return (
    <>
    <Header/>
    <Routes>
    <Route path="/payonline" element={<PayHereIntegration/>} />
    <Route path="/onlinepayment/verify/*" element={<PaymentVerification/>} />
    <Route path="/onlinepayment/fail/*" element ={<PaymentFailure/>}/>
    <Route path="/invoice" element ={<PaymentInvoice/>}/>
    <Route path="/billing" element ={<BillingForm/>}/>

    
    

   
    
    </Routes>
    </>
  )
}

export default Customer

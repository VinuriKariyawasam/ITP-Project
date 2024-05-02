import React from 'react'
import PayHereIntegration from '../CUSMain/CustomerPayments/PaymentHere';
import PaymentVerification from '../CUSMain/CustomerPayments/PaymentVerification';
import PaymentFailure from '../CUSMain/CustomerPayments/PaymentFailure';
import OnlineInvoice from '../CUSMain/CustomerPayments/OnlineInvoice';



import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PaymentHistory from '../CUSMain/CustomerPayments/PaymentHistory';

function Customer({toggleLoading}) {
  return (
    <>
    
    <Routes>
    <Route path="/payonline" element={<PayHereIntegration toggleLoading={toggleLoading}/>} />
    <Route path="/onlinepayment/verify/*" element={<PaymentVerification toggleLoading={toggleLoading}/>} />
    <Route path="/onlinepayment/fail/*" element ={<PaymentFailure toggleLoading={toggleLoading}/>}/>
    <Route path="/onlinepayment/invoice" element ={<OnlineInvoice toggleLoading={toggleLoading}/>}/>
  
    </Routes>
    </>
  )
}

export default Customer

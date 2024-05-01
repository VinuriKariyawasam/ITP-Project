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

function Customer() {
  return (
    <>
    
    <Routes>
    <Route path="/payonline" element={<PayHereIntegration/>} />
    <Route path="/onlinepayment/verify/*" element={<PaymentVerification/>} />
    <Route path="/onlinepayment/fail/*" element ={<PaymentFailure/>}/>
    <Route path="/onlinepayment/invoice" element ={<OnlineInvoice/>}/>
  
    </Routes>
    </>
  )
}

export default Customer

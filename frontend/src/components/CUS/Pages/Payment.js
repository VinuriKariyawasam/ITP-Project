import React from 'react'
import Header from '../CusHeader/Header';
import PayHereIntegration from '../CUSMain/CustomerPayments/PaymentHere';
import PaymentSuccess from '../CUSMain/CustomerPayments/PaymentSuccess';
import PaymentFailure from '../CUSMain/CustomerPayments/PaymentFailure';

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
    <Route path="/successpayment/*" element={<PaymentSuccess/>} />
    <Route path="/failpayment" element={<PaymentFailure/>} />
    

   
    
    </Routes>
    </>
  )
}

export default Customer

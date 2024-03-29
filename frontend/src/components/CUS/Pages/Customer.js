import React from 'react'
import PeriodicalAppointment from '../CUSMain/CUSAppointment/PeriodicalAppointment'
import Header from '../CusHeader/Header'
import MyAppointment from '../CUSMain/CUSAppointment/MyAppointment';
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
    <Route path="/" element={<PeriodicalAppointment/>} />
    <Route path="/customer/MyAppointment" element={<MyAppointment/>} />
    
    </Routes>
    </>
  )
}

export default Customer

import React from 'react'
import PeriodicalAppointment from '../CUSMain/CUSAppointment/PeriodicalAppointment'
import Header from '../CusHeader/Header'
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
    
    </Routes>
    </>
  )
}

export default Customer

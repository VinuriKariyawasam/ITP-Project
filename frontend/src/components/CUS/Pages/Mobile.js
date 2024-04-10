import React from 'react'
import Header from '../CusHeader/Header'
import Mechanicalreq from '../CUSMain/CUSMobileReq/Mechanicalreq'
import VehicleCarrReq from '../CUSMain/CUSMobileReq/VehicleCarrierReq'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function Mobile() {
  return (
    <>
    <Header/>
    <Routes>
    <Route path="/mobilemechanical" element={<Mechanicalreq/>} />
    <Route path="/vehiclecarriers" element={<VehicleCarrReq/>} />
    </Routes>
    </>
  )
}

export default Mobile;
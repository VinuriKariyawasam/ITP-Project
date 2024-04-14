import React from 'react'
import Header from '../CusHeader/Header'
import Mechanicalreq from '../CUSMain/CUSMobileReq/Mechanicalreq'
import VehicleCarrReq from '../CUSMain/CUSMobileReq/VehicleCarrierReq'
import EmBreakdownReq from '../CUSMain/CUSMobileReq/EmBreakdownReq'
import MobileMain from '../CUSMain/CUSMobileReq/CusMobileMain'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function Mobile() {
  return (
    <>

    <Routes>
    <Route path="/mobilemechanical" element={<Mechanicalreq/>} />
    <Route path="/vehiclecarriers" element={<VehicleCarrReq/>} />
    <Route path="/breakdownrequests" element={<EmBreakdownReq/>} />
    <Route path="/mobilemain" element={<MobileMain/>} />
    </Routes>
    </>
  )
}

export default Mobile;
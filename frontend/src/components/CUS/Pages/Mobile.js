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

function Mobile({ toggleLoading }) {
  return (
    <>

    <Routes>
    <Route path="/mobilemechanical" element={<Mechanicalreq toggleLoading={toggleLoading} />} />
    <Route path="/vehiclecarriers" element={<VehicleCarrReq toggleLoading={toggleLoading} />} />
    <Route path="/breakdownrequests" element={<EmBreakdownReq toggleLoading={toggleLoading} />} />
    <Route path="/mobilemain" element={<MobileMain toggleLoading={toggleLoading} />} />
    </Routes>
    </>
  )
}

export default Mobile;
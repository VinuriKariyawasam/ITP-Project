import React from 'react'
import Mechanicalreq from '../MobileReqMain/Mobilereq/Mechanicalreq'
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
    <Route path="/Mechanical" element={<Mechanicalreq/>} />
    </Routes>
    </>
  )
}

export default Customer;
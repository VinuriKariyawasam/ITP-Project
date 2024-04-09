import React from 'react'
import Header from '../CusHeader/Header'
import Mechanicalreq from '../MobileReqMain/Mobilereq/Mechanicalreq'

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
    <Route path="/Mechanical" element={<Mechanicalreq/>} />
    </Routes>
    </>
  )
}

export default Mobile;
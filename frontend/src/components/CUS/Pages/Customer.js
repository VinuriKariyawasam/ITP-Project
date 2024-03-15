import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Header from '../CusHeader/Header'
import Products from '../inventory/Products';
function Customer() {
  return (
    <>
    <Header/>
    <Routes>
        <Route path="/products" element={<Products/>} />
      </Routes>
      </>
  )
}

export default Customer
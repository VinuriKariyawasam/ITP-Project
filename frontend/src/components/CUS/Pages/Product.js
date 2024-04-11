import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from '../CUSMain/inventory/Products'
import SparePartsform from '../CUSMain/inventory/SparePartsform';
import Lubricants from '../CUSMain/inventory/Lubricants';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";



function Product() {
  return (
    <Routes>
        <Route path="/*" element={<Products/>} />
        <Route path="/lubricants" element={<Lubricants/>} />
        <Route path="/Sparepartsform" element={<SparePartsform/>} />
      </Routes>
  )
}

export default Product
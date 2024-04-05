import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from '../CUSMain/inventory/Products'
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
      </Routes>
  )
}

export default Product
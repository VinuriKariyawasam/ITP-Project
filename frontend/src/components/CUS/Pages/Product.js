import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from '../CUSMain/inventory/Products'
import SparePartsform from '../CUSMain/inventory/SparePartsform';
import Lubricants from '../CUSMain/inventory/Lubricants';
import Tire from '../CUSMain/inventory/Tire'
import Order from '../CUSMain/inventory/orderHistory'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";



function Product({ toggleLoading }) {
  return (
    <Routes>
        <Route path="/*" element={<Products toggleLoading={toggleLoading}/>} />
        <Route path="/lubricants" element={<Lubricants toggleLoading={toggleLoading}/>} />
        <Route path="/tires" element={<Tire toggleLoading={toggleLoading}/>}/>
        <Route path="/Sparepartsform" element={<SparePartsform toggleLoading={toggleLoading}/>} />
        <Route path='/myorders' element={<Order toggleLoading={toggleLoading}/>}/>
      </Routes>
  )
}

export default Product
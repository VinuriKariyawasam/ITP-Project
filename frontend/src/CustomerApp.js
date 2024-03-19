import React from "react";
import Header from './components/CUS/CusHeader/Header'
import Products from './components/CUS/inventory/Products'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function CustomerApp() {
  return (
    <div>
      <>
    <Header/>
    <Routes>
        <Route path="/products" element={<Products/>} />
      </Routes>
      </>
    </div>
  );
}

export default CustomerApp;

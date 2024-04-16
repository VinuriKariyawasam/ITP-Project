import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from '../CUSMain/CustomerAboutUs/AboutUs';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


function CUSAboutUs() {
    return (
        <Routes>
            <Route path="/*" element={<AboutUs/>} />
          </Routes>
      )
}

export default CUSAboutUs
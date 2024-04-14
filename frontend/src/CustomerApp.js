// Import necessary modules
import React, { useState, useCallback, useEffect,useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import components and context
import Header from "../src/components/CUS/CusHeader/Header";
import CUSAffairs from "./components/CUS/Pages/CUSAffairs";
import CUSAppointment from "./components/CUS/Pages/CUSAppointment";
import Payment from "./components/CUS/Pages/Payment";
import MobileService from "./components/CUS/Pages/Mobile";
import Products from "../src/components/CUS/Pages/Product";
import Cushome from "../src/components/CUS/CUSMain/Cushome";
import CusRegistration from "./components/CUS/CUSMain/CusRegistration";
import CusLogin from "./components/CUS/CUSMain/CusLogin";
import CusProfile from "./components/CUS/CUSMain/CusProfile";
import CusFooter from "../src/components/CUS/CusFooter/CusFooter";
import { CusAuthContext } from "./context/cus-authcontext";

// Import Bootstrap CSS and icons
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

let logoutTimer;
// Main component
function CustomerApp() {
  // Define state variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  // Define login and logout functions
  const login = useCallback((userId,email,name,token,expirationDate) => {
    setIsLoggedIn(true);
    setEmail(email)
    setUserId(userId);
    setName(name);
    setToken(token);
    
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: userId,
        name: name,
        email: email,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setEmail(null);
    setName(null);
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  // Check for authentication data in localStorage on component mount
  useEffect(()=>{
    if(token && tokenExpirationDate){
      const remainingTime=tokenExpirationDate.getTime()-new Date().getTime();
      logoutTimer=setTimeout(logout,remainingTime)
    }
    else{
      clearTimeout(logoutTimer);
    }
  },[token,logout,tokenExpirationDate]);

  useEffect(()=>{
    if(token && tokenExpirationDate){
      const remainingTime=tokenExpirationDate.getTime()-new Date().getTime();
      logoutTimer=setTimeout(logout,remainingTime)
    }
    else{
      clearTimeout(logoutTimer);
    }
  },[token,logout,tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.email, storedData.userId,storedData.name,storedData.token,new Date(storedData.expiration));
    }
  }, [login]);
  // Define routes
  return (
   
      <CusAuthContext.Provider
        value={{
          isLoggedIn:!!token,
          token: token,
          userId: userId,
          name: name,
          email: email,
          login: login,
          logout: logout
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Cushome />} />
          <Route path="/products/*" element={<Products />} />
          <Route path="/appointment/*" element={<CUSAppointment />} />
          <Route path="/payments/*" element={<Payment />} />
          <Route path="/cusaffairs/*" element={<CUSAffairs />} />
          <Route path="/cusprofile/*" element={<CusProfile />} />
          <Route path="/cusreg/*" element={<CusRegistration />} />
          <Route path="/cuslogin/*" element={<CusLogin />} />
          <Route path="/mobservices/*" element={<MobileService />} />
        </Routes>
        <CusFooter />
      </CusAuthContext.Provider>
   
  );
}

export default CustomerApp;

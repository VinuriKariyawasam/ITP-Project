import React, { createContext, useState } from "react";

// Create the context object
const StaffAuthContext = createContext();

// Create the provider component
const StaffAuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const login = (userData) => {
    // Perform login logic here, set isLoggedIn to true, and store user data
    setIsLoggedIn(true);
    setUserData(userData);
  };

  const logout = () => {
    // Perform logout logic here, set isLoggedIn to false, and clear user data
    setIsLoggedIn(false);
    setUserData({});
  };

  // Use StaffAuthContext.Provider instead of AuthContext.Provider
  return (
    <StaffAuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </StaffAuthContext.Provider>
  );
};

export { StaffAuthContext, StaffAuthProvider };

// AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const StaffAuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userPossition: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const StaffAuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const storedAuth = sessionStorage.getItem("auth");
    return storedAuth
      ? JSON.parse(storedAuth)
      : { isLoggedIn: false, userId: null, userPosition: null, token: null };
  });

  const login = (userId, token, userPosition) => {
    setAuthState({ isLoggedIn: true, userId, userPosition, token });
    sessionStorage.setItem(
      "auth",
      JSON.stringify({ isLoggedIn: true, userId, userPosition, token })
    );
  };

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      userId: null,
      userPosition: null,
      token: null,
    });
    sessionStorage.removeItem("auth");
  };

  useEffect(() => {
    const storedAuth = sessionStorage.getItem("auth");
    if (storedAuth) {
      setAuthState(JSON.parse(storedAuth));
    }
  }, []);

  return (
    <StaffAuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </StaffAuthContext.Provider>
  );
};

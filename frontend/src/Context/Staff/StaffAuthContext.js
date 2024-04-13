import React, { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const StaffAuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userPosition: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const StaffAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const logoutTimerRef = useRef(null);

  const [authState, setAuthState] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth
      ? JSON.parse(storedAuth)
      : { isLoggedIn: false, userId: null, userPosition: null, token: null };
  });

  const login = (userId, token, userPosition) => {
    setAuthState({ isLoggedIn: true, userId, userPosition, token });
    localStorage.setItem(
      "auth",
      JSON.stringify({ isLoggedIn: true, userId, userPosition, token })
    );
    startLogoutTimer();
  };

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      userId: null,
      userPosition: null,
      token: null,
    });
    localStorage.removeItem("auth");
    clearLogoutTimer();
    navigate("/staff/login"); // Redirect to login page
  };

  const startLogoutTimer = () => {
    logoutTimerRef.current = setTimeout(logout, 30 * 60 * 1000); // 30 minutes
  };

  const clearLogoutTimer = () => {
    clearTimeout(logoutTimerRef.current);
  };

  const resetLogoutTimer = () => {
    clearLogoutTimer();
    startLogoutTimer();
  };

  // Initialize authState from local storage
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuthState(JSON.parse(storedAuth));
    }
  }, []);

  // Reset logout timer on user activity
  useEffect(() => {
    window.addEventListener("mousemove", resetLogoutTimer);
    window.addEventListener("mousedown", resetLogoutTimer);
    window.addEventListener("keypress", resetLogoutTimer);

    return () => {
      clearLogoutTimer();
      window.removeEventListener("mousemove", resetLogoutTimer);
      window.removeEventListener("mousedown", resetLogoutTimer);
      window.removeEventListener("keypress", resetLogoutTimer);
    };
  }, []);

  return (
    <StaffAuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </StaffAuthContext.Provider>
  );
};

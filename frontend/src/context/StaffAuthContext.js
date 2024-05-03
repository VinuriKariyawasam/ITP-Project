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
    const timestamp = Date.now(); // Capture current timestamp
    setAuthState({
      isLoggedIn: true,
      userId,
      userPosition,
      token,
      timestamp, // Store timestamp along with other auth data
    });
    localStorage.setItem(
      "auth",
      JSON.stringify({
        isLoggedIn: true,
        userId,
        userPosition,
        token,
        timestamp,
      })
    );
    startLogoutTimer();
  };

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      userId: null,
      userPosition: null,
      token: null,
      timestamp: null, // Clear timestamp when logging out
    });
    localStorage.removeItem("auth");
    clearLogoutTimer();
    navigate("/staff/login");
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

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const { token, timestamp } = JSON.parse(storedAuth);
      if (token && timestamp) {
        const currentTime = Date.now();
        const twelveHoursInMillis = 12 * 60 * 60 * 1000;
        const timeElapsed = currentTime - timestamp;
        if (timeElapsed < twelveHoursInMillis) {
          setAuthState(JSON.parse(storedAuth));
          startLogoutTimer();
        } else {
          logout(); // Token has expired, log the user out
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleUserActivity = () => {
      resetLogoutTimer();
    };

    const events = ["mousemove", "mousedown", "keypress"];
    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    return () => {
      clearLogoutTimer();
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, []);

  return (
    <StaffAuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </StaffAuthContext.Provider>
  );
};

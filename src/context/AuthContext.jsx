import React, { useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfos, setUserInfos] = useState([]);

  useEffect(() => {
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    if (savedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

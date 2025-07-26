import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { tryLogin } from "../services/DummyAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfos, setUserInfos] = useState([]);

  // At the mount, check if the user is logged in

  useEffect(() => {
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    const savedUserInfos = localStorage.getItem("userInfos");

    if (savedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
    if (savedUserInfos) {
      setUserInfos(savedUserInfos);
    }
  }, []);

  useEffect(() => {
    logIn("emilysaa", "emilyspass");
  }, []);

  // Update localStorage when loggin changes

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  // Update localStorage when user info changes
  useEffect(() => {
    if (userInfos) {
      localStorage.setItem("userInfos", JSON.stringify(userInfos));
      console.log("User info updated:", userInfos);
    }
  }, [userInfos]);

  const logIn = async (username, password) => {
    try {
      const response = await tryLogin(username, password);
      if (response.success === true) {
        setIsLoggedIn(true);
        setUserInfos(response.data);
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.error("Network/API error :", error);
    }
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUserInfos(null);
    localStorage.removeItem("userInfos");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, logIn, logOut, userInfos }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

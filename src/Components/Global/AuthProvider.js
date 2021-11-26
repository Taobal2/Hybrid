import React, { createContext, useState, useEffect } from "react";
import { app } from "../../Base";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ msg: "This is a global state", currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialSessionData = JSON.parse(localStorage.getItem("session")) || {
    userRole: null,
    token: null,
    id: null,
  };

  const [user, setUser] = useState(initialSessionData);

  useEffect(() => {
    localStorage.setItem("session", JSON.stringify(user));
  }, [user]);

  const login = (loginUser) => {
    setUser(loginUser);
  };

  const logout = () => {
    setUser({
      userRole: null,
      token: null,
      id: null,
    });
    console.log("Usuario cerró sesión.");
  };

  return (
    <AppContext.Provider value={{ user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

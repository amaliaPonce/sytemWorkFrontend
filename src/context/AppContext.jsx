import React, { createContext, useEffect, useState } from "react";
import { getSession, setSession, clearSession } from "../utils/session";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialSessionData = getSession() || {
    userRole: null,
    token: null,
    id: null,
  };

  const [user, setUser] = useState(initialSessionData);

  useEffect(() => {
    setSession(user);
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
    clearSession();
  };

  return (
    <AppContext.Provider value={{ user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

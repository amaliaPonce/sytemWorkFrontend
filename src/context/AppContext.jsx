import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialSessionData = JSON.parse(localStorage.getItem("session")) || {
    userRole: null,
    token: null,
    id: null,
  };

  // Usa useState para mantener el estado de la sesión del usuario
  const [user, setUser] = useState(initialSessionData);

  useEffect(() => {
    localStorage.setItem("session", JSON.stringify(user));
  }, [user]);

  // Función para iniciar sesión
  const login = (loginUser) => {
    setUser(loginUser);
    console.log("Usuario inició sesión:", loginUser);
  };

  // Función para cerrar sesión
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

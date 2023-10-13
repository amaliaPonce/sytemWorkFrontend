import React, { useContext } from "react";
import { AppContext } from "./AppProvider";
const Logout = () => {
    const { logout } = useContext(AppContext);
  
    const handleLogout = () => {
      logout();
    };
  
    return (
      <button onClick={handleLogout}>Logout</button>
    );
  };
  
  export default Logout;
  
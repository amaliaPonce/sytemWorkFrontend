import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
const Logout = () => {
    const { logout } = useContext(AppContext);
  
    const handleLogout = () => {
      logout();
    };
  
    return (
      <button onClick={handleLogout}>Log out</button>
    );
  };
  
  export default Logout;
  
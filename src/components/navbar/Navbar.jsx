import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Navbar = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("Invitado");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { userInfo } = useUser(user.id);

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.name);
      if (userInfo.profile_photo) {
        setProfilePhoto(
          `${import.meta.env.VITE_API_URL}/uploads/${userInfo.profile_photo}`
        );
      }
    }
  }, [userInfo]);

  const handleLogout = () => {
    logout();
  
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    
    navigate("/");
  }
  

  return (
    <nav className="bg-white rounded-full py-2 px-4 flex items-center justify-between mx-auto mt-10 shadow-md max-w-3xl">
      <div className="flex items-center mx-4 md:mx-20 lg:mx-24 space-x-4 md:space-x-12">
        {profilePhoto && (
          <img src={profilePhoto} alt={userName} className="w-8 h-8 rounded-full" />
        )}
        <h1 className="text-black text-lg font-semibold ml-2 md:ml-4">
          Hola, {userName}👋🏻
        </h1>
      </div>

        <button
          onClick={handleLogout}
          className="text-custom-blue cursor-pointer ml-2 md:mr-8"
        >
          Cerrar sesión
        </button>
    </nav>
  );
};

export default Navbar;

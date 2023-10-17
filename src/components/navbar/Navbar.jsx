import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const userName = user.name || 'Invitado';

  const handleLogout = () => {
    logout(); // Llama a la función de cierre de sesión en tu contexto o en tu componente
    navigate('/'); // Redirige al usuario a la página principal
  };

  return (
    <nav className="bg-white rounded-full py-2 px-4 flex items-center shadow-md justify-center mx-20 mt-10">
      <h1 className="text-black text-lg font-semibold">Hola, {userName}👋🏻</h1>
      {user.id && (
        <button onClick={handleLogout} className="ml-4 text-custom-blue cursor-pointer">
          Cerrar sesión
        </button>
      )}
    </nav>
  );
};

export default Navbar;

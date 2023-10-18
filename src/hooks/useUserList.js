import { useState, useEffect } from "react";
import { listUsersService } from "../services/index";

export const useUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Inicia con el valor de 'loading' en true
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const sessionData = JSON.parse(localStorage.getItem("session"));
        const token = sessionData ? sessionData.token : null;

        if (!token) {
          setError("No se encontró el token de sesión en localStorage.");
          return;
        }

        setLoading(true); // Indicamos que comenzamos la carga
        console.log("Loading is set to true");

        const response = await listUsersService(token);

        if (Array.isArray(response) && response.length > 0) {
          setUsers(response);
          console.log("Users loaded:", response); // Añadimos un console.log para mostrar los usuarios
          setError(null);
        } else {
          setError("No se encontraron usuarios.");
        }
      } catch (error) {
        setError("Error al obtener la lista de usuarios: " + error.message);
      } finally {
        setLoading(false); // Indicamos que la carga ha finalizado
        console.log("Loading is set to false");
      }
    };

    loadUsers();
  }, []);

  return { users, error, loading };
};

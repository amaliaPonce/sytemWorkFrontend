import { useState, useEffect } from "react";
import { listUsersService } from "../services/index";

export const useUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const sessionData = JSON.parse(localStorage.getItem("session"));
        const token = sessionData ? sessionData.token : null;

        if (!token) {
          setError("No se encontró el token de sesión en localStorage.");
          setLoading(false);
          return;
        }

        const response = await listUsersService(token);


        if (Array.isArray(response) && response.length > 0) {
          setUsers(response);
          setError(null);
        } else {
          setError("No se encontraron usuarios.");
        }
      } catch (error) {
        setError("Error al obtener la lista de usuarios: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);


  return { users, error, loading };
};

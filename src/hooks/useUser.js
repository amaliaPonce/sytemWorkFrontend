import { useState, useEffect } from "react";
import { getUserByIdService } from "../services/index";

const useUser = (id) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const sessionData = JSON.parse(localStorage.getItem("session"));
        const token = sessionData ? sessionData.token : null;

        if (!token) {
          setError("No se encontró el token de sesión en localStorage.");
          setLoading(false);
          return;
        }

        setLoading(true);
        const response = await getUserByIdService(id, token);

        if (Array.isArray(response) && response.length > 0) {
          setUserInfo(response[0]);
          setError(null);
        } else {
          setError("Error al obtener los detalles del usuario.");
          console.error("Error al obtener los detalles del usuario:", response);
        }
      } catch (error) {
        setError("Error al obtener los detalles del usuario: " + error.message);
        console.error("Error al obtener los detalles del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  return { userInfo, error, loading };
};

export default useUser;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByIdService } from '../../services/';

function UserDetailsComponent() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userToken = JSON.parse(localStorage.getItem("userToken"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionData = JSON.parse(localStorage.getItem("session"));
        console.log("Datos de sesión:", sessionData); 
        const token = sessionData.token;
        console.log("Token de sesión:", token); // Agregado para depuración
    
        if (!token) {
          setError("No se encontró el token de sesión en localStorage.");
          retur;n
        }

        const responseData = await getUserByIdService(userId, token);
        console.log("Respuesta de ByIdService:", responseData);

      
        setUser(responseData[0]); 

        setIsLoading(false); 
      } catch (error) {
        setError(`Error al cargar el usuario: ${error.message}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, userToken]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No se encontró información de usuario.</div>;
  }

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <ul>
        <li>
          <strong>ID:</strong> {user.id || "NA"}
        </li>
        <li>
          <strong>Username:</strong> {user.username || "NA"}
        </li>
        <li>
          <strong>Name:</strong> {user.name || "NA"}
        </li>
        <li>
          <strong>Email:</strong> {user.email || "NA"}
        </li>
        <li>
          <strong>Profile Photo:</strong> {user.profile_photo || "NA"}
        </li>
        <li>
          <strong>Other Details:</strong> {user.other_details || "NA"}
        </li>
        <li>
          <strong>Created At:</strong> {user.created_at || "NA"}
        </li>
        <li>
          <strong>User Role:</strong> {user.userRole || "NA"}
        </li>
      </ul>
    </div>
  );
}

export default UserDetailsComponent;

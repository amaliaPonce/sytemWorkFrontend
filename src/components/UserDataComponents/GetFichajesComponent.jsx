import React, { useState, useEffect } from 'react';
import { getFichajesService, getUserByIdService } from '../../services/index';
import UserListComponent from './UserListComponent';

function GetFichajesComponent({ userId }) {
  const [fichajes, setFichajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener el token del usuario desde el almacenamiento local
    const userToken = JSON.parse(localStorage.getItem("userToken"));

    // Llamar al servicio para obtener el historial de fichajes
    async function fetchFichajes() {
      try {
        const fetchedFichajes = await getFichajesService(userId, userToken);
        setFichajes(fetchedFichajes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    // Llamar al servicio para obtener los detalles del usuario
    async function fetchUserDetails() {
      try {
        const userDetails = await getUserByIdService(userId, userToken);
        setUser(userDetails);
      } catch (error) {
        console.error("Error al obtener detalles del usuario:", error);
      }
    }

    if (userToken) {
      fetchFichajes();
      fetchUserDetails();
    }
  }, [userId]);

  // Función para formatear la fecha en un formato legible
  function formatFecha(fecha) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return new Date(fecha).toLocaleString('es-ES', options);
  }

  return (
    <div>
      <h2>Historial de Fichajes</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {user ? (
            <div>
              <h3>Detalles del Usuario</h3>
              {/* Muestra el nombre del usuario en esta sección */}
              <p>Nombre del Usuario: {user.name}</p>
            </div>
          ) : null}
         <ul>
  {fichajes.map((fichaje) => (
    <li key={fichaje.id}>
      {/* Muestra el nombre del usuario en lugar del ID */}
      {user ? `Usuario ${user.name}` : ''} - {fichaje.type} - {formatFecha(fichaje.time)}
    </li>
  ))}
</ul>

        </>
      )}
    </div>
  );
}

export default GetFichajesComponent;

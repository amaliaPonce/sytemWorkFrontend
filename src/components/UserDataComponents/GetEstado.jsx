import React, { useState, useEffect } from 'react';
import { getEstadoService } from '../../services/index';

function EstadoEmpleado({ userId }) {
  const [estado, setEstado] = useState('Cargando...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstado = async () => {
      try {
        const sessionData = JSON.parse(localStorage.getItem("session"));
        const token = sessionData?.token;

        if (!token) {
          console.error('No se encontró el token de sesión en localStorage.');
          setError('Token no encontrado');
          return;
        }

        const response = await getEstadoService(userId, token);

        if (typeof response === 'string') {
          setEstado(response);
        } else {
          setError('Respuesta no válida del servicio');
        }
      } catch (error) {
        console.error('Error al obtener el estado:', error);
        setError('Error al obtener el estado del empleado');
      }
    };

    fetchEstado();
  }, [userId]);

  const textColorClass = estado === 'El usuario está dentro' ? 'text-green-500' : 'text-red-500';

  return (
    <div>
      <p className={textColorClass}>{estado}</p>
    </div>
  );
}

export default EstadoEmpleado;

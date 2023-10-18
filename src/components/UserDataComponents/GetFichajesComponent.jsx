import React, { useState, useEffect } from 'react';
import { getFichajesService } from '../../services/index';

function FichajesComponent({ userId }) {
  const [fichajes, setFichajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFichajes = async () => {
      try {
        const sessionData = JSON.parse(localStorage.getItem('session'));
        const userToken = sessionData?.token;

        if (!userToken) {
          setError('No se encontró el token de sesión en localStorage.');
          setLoading(false);
          return;
        }

        const fetchedFichajes = await getFichajesService(userId, userToken);
        const sortedFichajes = fetchedFichajes.sort((a, b) => a.user_id - b.user_id);
        setFichajes(sortedFichajes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error al obtener fichajes:', err);
      }
    };

    fetchFichajes();
  }, [userId]);

  const groupedFichajes = fichajes.reduce((groups, fichaje) => {
    const date = new Date(fichaje.time).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(fichaje);
    return groups;
  }, {});

  const [expanded, setExpanded] = useState({});

  const toggleExpansion = (date) => {
    setExpanded((prevState) => ({
      ...prevState,
      [date]: !prevState[date],
    }));
  };

  const [historialExpanded, setHistorialExpanded] = useState(false);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2
        onClick={() => setHistorialExpanded(!historialExpanded)}
        className="text-3xl font-bold mb-6 cursor-pointer text-blue-600"
      >
        Historial de Fichajes{' '}
        {historialExpanded ? '▼' : '▶'}
      </h2>
      {historialExpanded && (
        <>
          {loading ? (
            <p className="text-gray-500">Cargando...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div>
              {Object.keys(groupedFichajes).map((date) => (
                <div key={date} className="mb-6">
                  <button
                    onClick={() => toggleExpansion(date)}
                    className="text-xl font-semibold mb-2 cursor-pointer text-blue-500"
                  >
                    {date}{' '}
                    {expanded[date] ? '▼' : '▶'}
                  </button>
                  {expanded[date] && (
                    <table className="table-auto w-full text-left whitespace-no-wrap">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Empleado</th>
                          <th className="px-4 py-2">Tipo</th>
                          <th className="px-4 py-2">Hora</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedFichajes[date].map((fichaje) => (
                          <tr key={fichaje.id} className="text-gray-600">
                            <td className="border px-4 py-2">{fichaje.user_id}</td>
                            <td className="border px-4 py-2">{fichaje.type.toLowerCase() === 'entry' ? 'entrada' : fichaje.type.toLowerCase() === 'exit' ? 'salida' : fichaje.type}</td>
                            <td className="border px-4 py-2">{new Date(fichaje.time).toLocaleTimeString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FichajesComponent;


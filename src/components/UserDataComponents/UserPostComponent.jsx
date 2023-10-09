import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserByIdService } from "../../services/index";

function UserInfoComponent({ userId, userToken }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Llama al servicio para obtener detalles del usuario cuando el componente se monta
    // Asegúrate de tener el servicio adecuado para obtener los detalles del usuario
    // y que use userId y userToken para hacer la solicitud.
    // Por ejemplo, podrías llamarlo como getUserDetailsService(userId, userToken)
    console.log("Iniciando solicitud de detalles del usuario...");
    getUserByIdService(userId, userToken)
      .then((data) => {
        console.log("Detalles del usuario recibidos con éxito:", data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Error al obtener detalles del usuario:", error);
      });
  }, [userId, userToken]);

  if (!user) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <section className="info-user">
      {/* Renderiza los detalles del usuario */}
    </section>
  );
}

// Define los PropTypes para userId y userToken
UserInfoComponent.propTypes = {
  userId: PropTypes.number.isRequired,
  userToken: PropTypes.string.isRequired,
};

export default UserInfoComponent;

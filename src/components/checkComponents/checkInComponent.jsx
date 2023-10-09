import React, { useState } from "react";
import PropTypes from "prop-types";
import { registerCheckinService } from "../../services/index";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function CheckInComponent({  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCheckIn = async () => {
    setIsLoading(true);
    setError("");
  
    try {
      // Obtén el token de sesión desde localStorage
      const sessionData = JSON.parse(localStorage.getItem("session"));
      console.log("Datos de sesión:", sessionData); // Agregado para depuración
      const token = sessionData.token; // Accede al token
      console.log("Token de sesión:", token); // Agregado para depuración
  
      if (!token) {
        setError("No se encontró el token de sesión en localStorage.");
        return;
      }
  
      await registerCheckinService(token); // Pasa el userToken como argumento
      setSuccessMessage("Check-in exitoso");
    } catch (error) {
      setError("Error al registrar el check-in: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <div>
      <h2>Check-In</h2>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <Button onClick={handleCheckIn} disabled={isLoading}>
            Registrar Check-In
          </Button>
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
        </>
      )}
    </div>
  );
}



export default CheckInComponent;

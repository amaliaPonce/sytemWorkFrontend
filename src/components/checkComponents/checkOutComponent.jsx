import React, { useState } from "react";
import PropTypes from "prop-types";
import { registerCheckoutService } from "../../services/index";
import { Button, Spinner, Alert } from "react-bootstrap";

function CheckOutComponent({ userId, userToken }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
  
    const handleCheckout = async () => {
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
     
         await registerCheckoutService(token); // Pasa el userToken como argumento
         setSuccessMessage("Check-out exitoso");
       } catch (error) {
         setError("Error al registrar el check-in: " + error.message);
       } finally {
         setIsLoading(false);
       }
     };
     
   
    
    return (
      <div>
        <h2>Registro de Salida</h2>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <Button onClick={handleCheckout} disabled={isLoading}>
              Registrar Salida
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
          </>
        )}
      </div>
    );
  }
  

  
  export default CheckOutComponent;
  
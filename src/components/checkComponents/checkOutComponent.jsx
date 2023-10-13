import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useCheckInOut } from "../../context/CheckInOutContext";
import { registerCheckoutService } from "../../services/index";
import { useNavigate } from "react-router-dom"; // Importa useNavigate desde react-router-dom

function CheckOutComponent() {
  const { isCheckedIn, setIsCheckedIn } = useCheckInOut();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate(); // Utiliza useNavigate para la navegación

  const handleCheckout = async () => {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    setShowSuccessMessage(false);

    try {
      const sessionData = JSON.parse(localStorage.getItem("session"));
      const token = sessionData?.token;

      if (!token) {
        setError("No se encontró el token de sesión en localStorage.");
        return;
      }

      await registerCheckoutService(token);
      setSuccessMessage("Check-out exitoso");
      setIsCheckedIn(false);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);

        if (sessionData?.userRole === "user") {
          navigate("/");
        }
      }, 1000);
    } catch (error) {
      setError("Error al registrar el check-out: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Registro de Salida</h2>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <Button
            onClick={handleCheckout}
            disabled={isLoading || !isCheckedIn}
            className="bg-red-500 hover-bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Registrar Salida
          </Button>
          {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
          {showSuccessMessage && (
            <Alert variant="success" className="mt-4">
              {successMessage}
            </Alert>
          )}
        </>
      )}
    </div>
  );
}

export default CheckOutComponent;

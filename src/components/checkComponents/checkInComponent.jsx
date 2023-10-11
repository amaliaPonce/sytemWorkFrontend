import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useCheckInOut } from "../../context/CheckInOutContext";
import { registerCheckinService } from "../../services/index";

function CheckInComponent() {
  const { isCheckedIn, setIsCheckedIn } = useCheckInOut();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleCheckIn = async () => {
    if (isCheckedIn) {
      return;
    }

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

      await registerCheckinService(token);
      setSuccessMessage("Check-in exitoso");
      setIsCheckedIn(true);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1000);
    } catch (error) {
      setError("Error al registrar el check-in: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Check-In</h2>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <Button
            onClick={handleCheckIn}
            disabled={isLoading || isCheckedIn}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Registrar Check-In
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

export default CheckInComponent;

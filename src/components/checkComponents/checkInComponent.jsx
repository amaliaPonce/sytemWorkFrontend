import React, { useState } from "react";
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
    <div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <button
          onClick={handleCheckIn}
          disabled={isLoading || isCheckedIn}
          className={`bg-black hover:bg-green-500 text-white font-semibold py-2 px-4 rounded transition-colors focus:outline-none ${
            isCheckedIn ? "bg-green-500 cursor-not-allowed" : ""
          }`}
        >
          {isCheckedIn ? "Registrado" : "Registrar Check-In"}
          <svg
            width="169"
            height="164"
            viewBox="0 0 169 164"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M84.5 75.1666C84.5 99.1994 77.395 121.626 65.1143 140.568M40.891 126.628L41.2712 126.013C51.1473 110.788 56.3701 93.157 56.3333 75.1666C56.3333 67.9174 59.3009 60.965 64.5832 55.839C69.8654 50.713 77.0297 47.8333 84.5 47.8333C91.9703 47.8333 99.1346 50.713 104.417 55.839C109.699 60.965 112.667 67.9174 112.667 75.1666C112.667 82.1161 112.174 88.9631 111.237 95.6666M96.323 142.434C100.669 134.019 104.187 125.224 106.829 116.167M133.862 123.902C138.404 108.418 140.833 92.0654 140.833 75.1666C140.836 65.5696 138.234 56.1411 133.291 47.829C128.347 39.5169 121.236 32.6141 112.672 27.8147C104.108 23.0152 94.3928 20.4882 84.5032 20.4877C74.6135 20.4871 64.898 23.0131 56.3333 27.8116M21.125 104.987C25.6317 95.9741 28.1667 85.8539 28.1667 75.1666C28.1667 65.2104 30.9129 55.8761 35.7013 47.8333"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      {error && <p>{error}</p>}
      {showSuccessMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default CheckInComponent;

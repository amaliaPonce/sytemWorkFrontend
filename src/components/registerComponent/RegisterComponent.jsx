import React, { useState } from "react";
import { registerService } from "../../services/index";
import "../../index.css";

function RegisterComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios");
      setSuccessMessage(null);
      return;
    }

    try {
      const response = await registerService(name, email, password);
      setError(null);

      if (response && response.id) {
        setSuccessMessage(
          `Registro exitoso. Su número de empleado es: ${response.id}. Inicia sesión ahora.`
        );
      } else {
        setSuccessMessage("Registro exitoso. Inicia sesión ahora.");
      }
    } catch (error) {
      setError(
        "Hubo un problema al registrar el usuario. Por favor, inténtelo de nuevo."
      );
      setSuccessMessage(null);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-blue-200 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-blue-700 mb-4 text-center">
        Registro
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Registrarse
          </button>
          
        </div>
        {error && (
      <div className="text-red-500 text-center mt-2">{error}</div>
    )}
    {successMessage && (
      <div className="text-blue-700 text-center mt-2">{successMessage}</div>
    )}

      </form>
    </div>
  );
}

export default RegisterComponent;

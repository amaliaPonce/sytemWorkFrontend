import React, { useState } from "react";
import { registerService } from "../../services/index";
import { Link } from "react-router-dom";

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
    <div className="">
      <div className="bg-white p-10 rounded-lg shadow-xl text-black w-96 mx-auto my-auto">
        <section className="mb-16">
          <h2 className="text-2xl font-bold">Regístrate</h2>
          <p className="text-custom-blue text-l mt-4">
            ¡Estamos encantados de conocerte!
          </p>
        </section>{" "}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tu nombre:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Juan Muñoz Perez"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tu email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="ejemplo@email.com"
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
              placeholder="******"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg hover:bg-custom-blue"
            >
              REGÍSTRATE{" "}
            </button>
          </div>
          <p className="mt-4 text-center text-custom-blue">
            ¿Ya tienes cuenta?{" "}
            <Link to="/" style={{ fontWeight: "bold" }}>
              Inicia sesión
            </Link>
          </p>
          {error && (
            <div className="text-red-500 text-center mt-2">{error}</div>
          )}
          {successMessage && (
            <div className="text-blue-700 text-center mt-2">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default RegisterComponent;

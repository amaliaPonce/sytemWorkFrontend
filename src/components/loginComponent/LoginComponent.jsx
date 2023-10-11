import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { loginService } from "../../services/index";

function LoginComponent() {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    if (event) {
      event.preventDefault();
    }

    setError("");
    setIsLoading(true);

    if (!id || !password) {
      setError("Por favor, ingresa tu ID y contraseña.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await loginService({ id, password });

      if (data.message === "Inicio de sesión exitoso") {
        login({
          userRole: data.userRole,
          token: data.token,
          id: data.id,
        });
        localStorage.setItem("session", JSON.stringify({
          userRole: data.userRole,
          token: data.token,
          id: data.id,
        }));
        navigate("/transfers");
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      if (error.message.includes("Network Error")) {
        setError(
          "Error de conexión. Por favor, verifica tu conexión a Internet."
        );
      } else if (error.message.includes("credenciales inválidas")) {
        setError(
          "Credenciales incorrectas. Por favor, verifica tu ID y contraseña."
        );
      } else {
        setError(
          "Ha ocurrido un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-blue-200 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-blue-700 mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">Número de empleado:</label>
          <input
            id="id"
            type="text"
            value={id}
            required
            onChange={(e) => setId(e.target.value)}
            autoComplete="username"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Contraseña:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </div>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {isLoading && <p className="text-center mt-2">Cargando...</p>}
      </form>
    </div>
  );
}

export default LoginComponent;

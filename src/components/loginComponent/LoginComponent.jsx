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

      console.log("Token JWT recibido:", data.token);

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
      console.error("Error en el manejo de la solicitud:", error);

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
    <section className="login-container">
      <h2 className="login-title">Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <fieldset>
          <label htmlFor="id">ID:</label>
          <input
            id="id"
            type="text"
            value={id}
            required
            onChange={(e) => setId(e.target.value)}
            autoComplete="username"
            className="register-input"
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="register-input"
          />
        </fieldset>

        <button type="submit">
          {isLoading ? "Cargando..." : "Iniciar Sesión"}
        </button>
        {error && <p className={`login-error `}>{error}</p>}
        {isLoading && <p className={`login-loading `}>Cargando...</p>}
      </form>
    </section>
  );
}

export default LoginComponent;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { loginService } from "../../services/index";
import { Link } from "react-router-dom";

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
          name: data.name,
        });

        // Almacena el objeto user en localStorage
        localStorage.setItem("session", JSON.stringify({
          userRole: data.userRole,
          token: data.token,
          id: data.id,
          name: data.name,
        }));

        navigate(`/transfers/${data.id}`);
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      if (error.message.includes("Network Error")) {
        setError("Error de conexión. Por favor, verifica tu conexión a Internet.");
      } else if (error.message.includes("credenciales inválidas")) {
        setError("Credenciales incorrectas. Por favor, verifica tu ID y contraseña.");
      } else {
        setError("Ha ocurrido un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="">
      <div className="p-4">
        <div className="bg-white p-10 pt-40 pb-40 rounded-lg shadow-xl text-black w-96 mx-auto my-auto">
          <section className="mb-16">
            <h2 className="text-2xl font-bold">Inicia Sesión</h2>
            <p className="text-custom-blue text-xl mt-4">
              ¡Nos encanta volver a verte!
            </p>
          </section>

          <form onSubmit={handleLogin} className="mt-4">
            <div className="mb-4">
              <label htmlFor="id" className="text-black">
                Tu número de empleado:
              </label>
              <input
                id="id"
                type="text"
                value={id}
                required
                onChange={(e) => setId(e.target.value)}
                autoComplete="username"
                className="w-full p-2 rounded border bg-white text-black focus:border-black focus:ring-2 focus:ring-black"
                placeholder="Por ejemplo: 1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-black">
                Contraseña:
              </label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full p-2 rounded border bg-white text-black"
                placeholder="******"
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-lg hover-bg-custom-blue"
              >
                {isLoading ? "Cargando..." : "INICIA SESIÓN"}
              </button>
              <p className="mt-4 text-center text-custom-blue">
                ¿Nuevo puesto de trabajo?{" "}
                <Link to="/register" style={{ fontWeight: "bold" }}>
                  Regístrate
                </Link>
              </p>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {isLoading && <p className="text-black">Cargando...</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;

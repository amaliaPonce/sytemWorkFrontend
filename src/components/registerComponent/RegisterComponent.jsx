import React, { useState } from "react";
import { registerService } from "../../services/index";

function RegisterComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerService(name, email, password);
      console.log("Response from registerService:", response); // Agregar este console.log

      setError(null);

      if (response && response.id) {
        console.log("ID from response:", response.id); // Agregar este console.log
        setSuccessMessage(`Registro exitoso. Su ID es: ${response.id}. Inicia sesión ahora.`);
      } else {
        setSuccessMessage("Registro exitoso. Inicia sesión ahora.");
      }
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      {error && <p>Error: {error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Registrarse</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterComponent;

import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  getUserByIdService,
  updateUserDetailsService,
  deleteUserByIdService,
} from "../../services/index";

function UserInfoComponent({ userId }) {
  const [user, setUser] = useState([
    {
      username: "",
      name: "",
      email: "",
      userRole: "",
      profile_photo: "", // Agrega la propiedad profile_photo aquí
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    username: "",
    name: "",
    email: "",
    userRole: "",
    // Agrega otros campos editables según sea necesario
  });

  // Agrega un estado para controlar la recarga de datos
  const [reloadData, setReloadData] = useState(false);
  const userToken = JSON.parse(localStorage.getItem("userToken"));

  const fetchData = useCallback(async () => {
    try {
      const sessionData = JSON.parse(localStorage.getItem("session"));
      console.log("Datos de sesión:", sessionData); 
      const token = sessionData.token;
      console.log("Token de sesión:", token); 
  
      if (!token) {
        setError("No se encontró el token de sesión en localStorage.");
        return;
      }
  
      const userDetails = await getUserByIdService(userId, userToken);
      setUser(userDetails);
    } catch (error) {
      console.error("Error al obtener detalles del usuario:", error);
    }
  }, [userId]);

  useEffect(() => {
    // Llama a fetchData cuando userId cambia
    fetchData();
  }, [userId, fetchData]);

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Agrega un console.log para verificar el archivo seleccionado
    console.log("Archivo seleccionado:", file);
  };

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteUser = async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("userToken"));

      if (!userToken) {
        console.error("Token de usuario no encontrado en el localStorage.");
        return;
      }

      const response = await deleteUserByIdService(userId, userToken);

      if (response.message === "Cuenta de usuario eliminada con éxito") {
        console.log("Usuario eliminado con éxito.");

        // Actualiza el estado 'user' con un valor vacío o nulo para forzar la recarga
        setUser(null);
      } else {
        console.error("Error al eliminar el usuario:", response.message);
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("userToken"));
  
      // Obtén los detalles actuales del usuario antes de la actualización
      await fetchData();
  
      const updatedUserData = {
        username: editedUserData.username,
        name: editedUserData.name,
        email: editedUserData.email,
        userRole: editedUserData.userRole,
        // Agrega otros campos editables aquí según sea necesario
      };
      const formData = new FormData();
  
      // Si se seleccionó un archivo, agrégalo al objeto FormData
      if (selectedFile) {
        formData.append("profile_photo", selectedFile);
  
        // Agrega un console.log para verificar que la foto esté en el FormData
        console.log("Foto en el FormData:", selectedFile);
      }
  
      // Agrega los datos actuales del usuario al objeto FormData para asegurarte de que no se pierdan
      for (const key in user) {
        formData.append(key, user[key]);
      }
  
      // Agrega otros campos de datos al objeto FormData
      for (const key in updatedUserData) {
        formData.append(key, updatedUserData[key]);
      }
  
      // Realiza una solicitud al servidor para actualizar los datos del usuario
      await updateUserDetailsService(userId, userToken, formData);
  
      setIsEditing(false);
      setSelectedFile(null);
  
      // Vuelve a cargar los detalles del usuario después de la actualización
      await fetchData();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };
  
  
  if (!user || user.length === 0) {
    return null;
  }

  return (
    <section className="info-user">
      <h2>Detalles del Usuario</h2>
      {isEditing ? (
        <div>
          <label>
            Nombre de usuario:
            <input
              type="text"
              name="username"
              value={editedUserData.username}
              onChange={handleFieldChange}
            />
          </label>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={editedUserData.name}
              onChange={handleFieldChange}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={editedUserData.email}
              onChange={handleFieldChange}
            />
          </label>
          <label>
            Rol de usuario:
            <select
              name="userRole"
              value={editedUserData.userRole}
              onChange={handleFieldChange}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </label>
          <label>
            Foto de perfil:
            <input
              type="file"
              id="profile_photo"
              name="profile_photo"
              accept="image/*"
              
              onChange={handleFileChange}
            />
          </label>

          <button onClick={handleSaveChanges}>Guardar Cambios</button>
        </div>
      ) : (
        <div>
          <img
            src={`${import.meta.env.VITE_API_URL}/${user[0].profile_photo}`}
            alt="Foto de perfil"
            style={{ maxWidth: "50%", height: "auto" }} 
          />
          <p>Nombre de usuario: {user[0].username}</p>
          <p>Nombre: {user[0].name}</p>
          <p>Email: {user[0].email}</p>
          <p>Rol de usuario: {user[0].userRole}</p>
          <button onClick={handleToggleEdit}>Editar</button>
          <button onClick={handleDeleteUser}>Eliminar Usuario</button>{" "}

        </div>
      )}
    </section>
  );
}

// Define los PropTypes para userId
UserInfoComponent.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserInfoComponent;

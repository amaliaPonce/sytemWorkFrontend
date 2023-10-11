import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  updateUserDetailsService,
  deleteUserByIdService,
} from "../../services/index";
import useUser from "../../hooks/useUser";

function UserInfoComponent() {
  const { userId } = useParams();
  const userToken = JSON.parse(localStorage.getItem("userToken"));

  const {
    userInfo,
    error: userError,
    loading: userLoading,
  } = useUser(userId, userToken);

  const [editedUserData, setEditedUserData] = useState({
    username: "",
    name: "",
    email: "",
    userRole: "",
    profile_photo: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  // Agrega un efecto para cargar los datos del usuario cuando el componente se monte
  useEffect(() => {
    if (userInfo) {
      setEditedUserData(userInfo);
    }
  }, [userInfo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // Extraer el nombre del archivo y asignarlo a editedUserData.profile_photo
    if (file) {
      setEditedUserData((prevData) => ({
        ...prevData,
        profile_photo: file.name,
      }));
    }
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
      } else {
        console.error("Error al eliminar el usuario:", response.message);
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const sessionData = JSON.parse(localStorage.getItem("session"));
      const token = sessionData ? sessionData.token : null;

      if (!token) {
        console.error("No se encontró el token de sesión en localStorage.");
        return;
      }

      const formData = new FormData();

      if (selectedFile) {
        formData.append("profile_photo", selectedFile);
        console.log("Archivo a enviar:", selectedFile);
      }

      for (const key in editedUserData) {
        formData.append(key, editedUserData[key]);
      }

      // Llamamos a la función para actualizar los datos en el servicio
      await updateUserDetailsService(userId, token, formData);

      // Una vez que los cambios se han guardado con éxito, actualizamos el estado
      const updatedProfilePhoto = formData.get("profile_photo");
      console.log("Foto de perfil actualizada:", updatedProfilePhoto);

      setEditedUserData({
        ...editedUserData,
        profile_photo: updatedProfilePhoto,
      });

      // Salimos del modo de edición y limpiamos el archivo seleccionado
      setIsEditing(false);
      setSelectedFile(null);

      // Ahora, aquí puedes ver los datos actualizados después de actualizar el estado
      console.log(
        "Cambios guardados con éxito. editedUserData:",
        editedUserData
      );
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  return (
    <section className="info-user">
      <h2>Detalles del Usuario</h2>
      {isEditing ? (
        <div>
          {/* Vista previa de la imagen */}
          {selectedFile && (
            <img
  src={`${import.meta.env.VITE_API_URL}/uploads/${editedUserData.profile_photo}`}
  alt={editedUserData.name}
  style={{ maxWidth: "50%", height: "auto" }}
/>

          )}
          <input
            type="text"
            name="username"
            value={editedUserData.username}
            onChange={handleFieldChange}
          />
          <input
            type="text"
            name="name"
            value={editedUserData.name}
            onChange={handleFieldChange}
          />
          <input
            type="email"
            name="email"
            value={editedUserData.email}
            onChange={handleFieldChange}
          />
          <input
            type="text"
            name="userRole"
            value={editedUserData.userRole}
            onChange={handleFieldChange}
          />
          {/* Input para seleccionar una imagen */}
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleSaveChanges}>Guardar Cambios</button>
          <button onClick={handleToggleEdit}>Cancelar</button>
        </div>
      ) : (
        <div>
          {userInfo ? (
            <>
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${
                  editedUserData.profile_photo
                }`}
                alt={editedUserData.name}
                style={{ maxWidth: "50%", height: "auto" }}
              />
              <p>Nombre de usuario: {editedUserData.username}</p>
              <p>Nombre: {editedUserData.name}</p>
              <p>Email: {editedUserData.email}</p>
              <p>Rol de usuario: {editedUserData.userRole}</p>
            </>
          ) : (
            <p>No se encontraron detalles de usuario.</p>
          )}
          <button onClick={handleToggleEdit}>Editar</button>
          <button onClick={handleDeleteUser}>Eliminar Usuario</button>{" "}
        </div>
      )}
    </section>
  );
}

export default UserInfoComponent;

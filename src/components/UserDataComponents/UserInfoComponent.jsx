import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateUserDetailsService, deleteUserByIdService, getUserByIdService } from "../../services/index"; // Añade getUserByIdService
import useUser from "../../hooks/useUser";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import EstadoEmpleado from '../UserDataComponents/GetEstado';

function UserInfoComponent() {
  const { userId } = useParams();
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const navigate = useNavigate();

  const [editedUserData, setEditedUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const sessionData = JSON.parse(localStorage.getItem("session"));
        const token = sessionData ? sessionData.token : null;
  
        if (!token) {
          console.error("Token de usuario no encontrado en el localStorage.");
          return;
        }
  
        const userData = await getUserByIdService(userId, token);
  
        if (Array.isArray(userData) && userData.length > 0) {
          setEditedUserData(userData[0]);
          console.log(userData[0]);
        } else {
          console.error("No se encontraron detalles de usuario.");
        }
      } catch (error) {
        console.error("Error al obtener los detalles del usuario:", error);
      }
    }
  
    if (userId) {
      fetchUserData();
    }
  }, [userId]);
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
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
      const sessionData = JSON.parse(localStorage.getItem("session"));
      const token = sessionData ? sessionData.token : null;

      if (!token) {
        console.error("Token de usuario no encontrado en el localStorage.");
        return;
      }

      const response = await deleteUserByIdService(userId, token);

      if (response.message === "Cuenta de usuario eliminada con éxito") {
        console.log("Usuario eliminado con éxito.");
        navigate(`/transfers/${userId}`);
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
      }

      for (const key in editedUserData) {
        formData.append(key, editedUserData[key]);
      }

      const response = await updateUserDetailsService(userId, token, formData);

      if (response.message === "Datos de usuario actualizados con éxito") {
        console.log("Cambios guardados con éxito.");
        setEditedUserData((prevData) => ({
          ...prevData,
          profile_photo: selectedFile ? selectedFile.name : prevData.profile_photo,
        }));
        setIsEditing(false);
      } else {
        console.error("Error al guardar los cambios:", response.message);
      }
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  }

  return (
    <>
      <Link to={`/transfers/${userId}`}>
        &larr; Volver a UserPage
      </Link>

      <section className="h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-xl w-full p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Detalles del Usuario</h2>
          {isEditing ? (
            <form className="space-y-4 text-center">
              <div className="text-center">
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${editedUserData.profile_photo}`}
                  alt={editedUserData.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="text-sm font-semibold">Nombre: </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editedUserData.username}
                  onChange={handleFieldChange}
                  className="form-control border rounded-lg"
                  placeholder="Nombre de usuario"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="text-sm font-semibold">Apellido</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedUserData.name}
                  onChange={handleFieldChange}
                  className="form-control border rounded-lg p-1"
                  placeholder="Nombre"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedUserData.email}
                  onChange={handleFieldChange}
                  className="form-control border rounded-lg p-1"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="userRole" className="text-sm font-semibold">Rol de usuario</label>
                <input
                  type="text"
                  id="userRole"
                  name="userRole"
                  value={editedUserData.userRole}
                  onChange={handleFieldChange}
                  className="form-control border rounded-lg p-1"
                  placeholder="Rol de usuario"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-4 p-1"
              />
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={handleSaveChanges}
                  className="btn btn-primary flex-grow"
                  type="submit"
                >
                  Guardar Cambios
                </button>
                <button onClick={handleToggleEdit} className="btn btn-secondary flex-grow">
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              {editedUserData ? (
                <>
                  <div className="text-center">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${editedUserData.profile_photo}`}
                      alt={editedUserData.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                  </div>
                  <p><strong>Nombre:</strong> {editedUserData.username}</p>
                  <p><strong>Apellido:</strong> {editedUserData.name}</p>
                  <p><strong>Email:</strong> {editedUserData.email}</p>
                  <p><strong>Rol de usuario:</strong> {editedUserData.userRole}</p>
                  <EstadoEmpleado userId={userId} userToken={userToken} />
                  <div className="flex justify-center space-x-4 mt-4">
                    <button onClick={handleToggleEdit} className="btn btn-primary flex-grow">
                      Editar
                    </button>
                    <button onClick={handleDeleteUser} className="btn btn-danger flex-grow">
                      Eliminar Usuario
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-center">No se encontraron detalles de usuario.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default UserInfoComponent;

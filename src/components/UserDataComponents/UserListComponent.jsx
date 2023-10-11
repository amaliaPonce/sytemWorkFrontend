import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserListComponent = ({ users, loading, error }) => {
  const [showList, setShowList] = useState(false);

  if (loading) {
    return <div className="alert alert-info">Cargando usuarios...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => setShowList(!showList)}
        className="text-2xl font-bold mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Lista de Usuarios
      </button>
      {showList && (
        <ul className="list-none">
          {users.map((user) => (
            <li key={user.id} className="mb-4 p-4 border rounded shadow">
              <Link
                to={`/user/${user.id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                {" "}
                <strong className="font-bold">Número de empleado: </strong>
                {user.id}
              </Link>{" "}
              <br />
              <strong className="font-bold">Nombre de Usuario: </strong>{" "}
              {user.username} <br />
              <strong className="font-bold">Nombre: </strong> {user.name} <br />
              <strong className="font-bold">Email: </strong> {user.email} <br />
              <strong className="font-bold">Rol de Usuario: </strong>{" "}
              {user.userRole} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserListComponent;

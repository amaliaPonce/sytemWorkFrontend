import React from 'react';
import { Link } from 'react-router-dom';

const UserListComponent = ({ users, loading, error }) => {
  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>ID:</strong> <Link to={`/user/${user.id}`}>{user.id}</Link> <br />
            <strong>Nombre de Usuario:</strong> {user.username} <br />
            <strong>Nombre:</strong> {user.name} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Rol de Usuario:</strong> {user.userRole} <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListComponent;

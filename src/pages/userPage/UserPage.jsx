import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Navbar from "../../components/navbar/Navbar";
import CheckInComponent from "../../components/checkComponents/checkInComponent";
import CheckOutComponent from "../../components/checkComponents/checkOutComponent";
import QuotesComponent from "../../components/QuotesComponent/QuotesComponent";
import { useUserList } from "../../hooks/useUserList";
import UserListComponent from "../../components/UserDataComponents/UserListComponent";
import "../../components/UserDataComponents/UserList.css";
import 'font-awesome/css/font-awesome.min.css';
import useUser from "../../hooks/useUser"; // Importa el hook useUser

const UserPage = () => {
  const { user } = useContext(AppContext);
  const { users, error, loading } = useUserList();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo, loading: userLoading } = useUser(); // Usa el hook useUser para cargar los datos del usuario

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Verifica si el usuario tiene el rol de administrador
  const isAdmin = userInfo && userInfo.userRole === "admin"; // Usamos userInfo para verificar el rol

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userInfo={user} />
      <div className="flex flex-grow justify-center items-center">
        <div className="w-1/2 p-2 flex justify-center items-center">
          <div className="pr-2">
            <CheckInComponent />
          </div>
          <div className="pl-2">
            <CheckOutComponent />
          </div>
        </div>
      </div>
      <div className="mb-20 pb-20">
        <QuotesComponent />
      </div>

      {userInfo && !userLoading && (  // Verifica que userInfo se haya cargado y que userLoading sea false
        isAdmin && (
          <div className="open-modal" onClick={openModal}>
            <i className="fa fa-plus" id="plus-icon"></i>
          </div>
        )
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <UserListComponent users={users} loading={loading} error={error} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;

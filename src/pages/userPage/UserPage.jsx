import React from 'react';
import CheckInComponent from '../../components/checkComponents/checkInComponent';
import CheckOutComponent from '../../components/checkComponents/checkOutComponent';


import UserListComponent from '../../components/UserDataComponents/UserListComponent';
import { useUserList } from "../../hooks/useUserList"; 
import GetFichajesComponent from '../../components/UserDataComponents/GetFichajesComponent';
import GetEstado from '../../components/UserDataComponents/GetEstado'
import Navbar from '../../components/navbar/Navbar';
const UserPage = () => {
  const { users, loading, error } = useUserList();


  return (
    <>
    <Navbar />
    </>
  );
};

export default UserPage;

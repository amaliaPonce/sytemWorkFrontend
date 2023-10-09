import React from 'react';
import CheckInComponent from '../../components/checkComponents/checkInComponent';
import CheckOutComponent from '../../components/checkComponents/checkOutComponent';


import UserListComponent from '../../components/UserDataComponents/UserListComponent';
import { useUserList } from "../../hooks/useUserList"; 

const UserPage = () => {
  const { users, loading, error } = useUserList();


  return (
    <>
      <CheckInComponent  />
      <CheckOutComponent />
      <UserListComponent users={users} loading={loading} error={error} />
    </>
  );
};

export default UserPage;

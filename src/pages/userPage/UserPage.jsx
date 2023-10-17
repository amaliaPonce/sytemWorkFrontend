import React from "react";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Navbar from "../../components/navbar/Navbar";
import CheckInComponent from "../../components/checkComponents/checkInComponent";
import CheckOutComponent from "../../components/checkComponents/checkOutComponent";
import QuotesComponent from "../../components/QuotesComponent/QuotesComponent";


const UserPage = () => {
  const { userId } = useParams();
  const userToken = JSON.parse(localStorage.getItem("userToken"));

  const { userInfo } = useUser(userId, userToken);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userInfo={userInfo} />
      <div className="flex flex-grow justify-center items-center">
        <div className="w-1/2 p-2 flex justify-center items-center">
          {/* Nuevo contenedor */}
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
    </div>
  );
};

export default UserPage;

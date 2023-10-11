import React, { createContext, useContext, useState } from "react";

const CheckInOutContext = createContext();

export const useCheckInOut = () => {
  return useContext(CheckInOutContext);
};

export const CheckInOutProvider = ({ children }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  return (
    <CheckInOutContext.Provider value={{ isCheckedIn, setIsCheckedIn }}>
      {children}
    </CheckInOutContext.Provider>
  );
};

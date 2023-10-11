import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import UserPage from './pages/userPage/UserPage';
import UserInfoComponent from './components/UserDataComponents/UserInfoComponent';

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/transfers" element={<UserPage />} />
      <Route path="/user/:userId" element={<UserInfoComponent />} />

    </Routes>
  );
};

export default RoutesApp;

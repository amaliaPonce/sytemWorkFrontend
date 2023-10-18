import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import UserPage from './pages/userPage/UserPage';
import RegisterPage from './pages/homePage/RegisterPage';

import UserInfoComponent from './components/UserDataComponents/UserInfoComponent';

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user/:userId" element={<UserInfoComponent />} />
      <Route path="/transfers/:userId" element={<UserPage />} />
    </Routes>
  );
};


export default RoutesApp;

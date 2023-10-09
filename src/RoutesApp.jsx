import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/homePage';
import UserPage from './pages/userPage/UserPage';
import UserDetailsComponent from './components/UserDataComponents/UserDetailsComponent';

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/transfers" element={<UserPage />} />
      <Route path="/users/profile/:userId" element={<UserDetailsComponent />} />

    </Routes>
  );
};

export default RoutesApp;

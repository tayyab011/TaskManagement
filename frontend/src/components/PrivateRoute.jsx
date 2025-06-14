import React from 'react';
import { getToken } from '../helper/SessionHelper';
import DashboardPage from '../pages/DashboardPage';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
  const auth = getToken();
  return auth ? (
    children
  ) : (
    <Navigate
      to="/login"
      state={{ from: location, message: "You need to login first" }}
      replace
    />
  );
};

export default PrivateRoute;
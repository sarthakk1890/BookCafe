import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children, ...rest }) => {

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />
  }

  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to={"/login"} />
  }

  if (!loading) {
    return children ? children : <Outlet />;
  }

  return null;

};

export default ProtectedRoute;

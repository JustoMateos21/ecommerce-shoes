import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../store";

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(StoreContext);
  const { userInfo } = state;
  return userInfo ? children : <Navigate to="signin" />;
};

export default ProtectedRoute;

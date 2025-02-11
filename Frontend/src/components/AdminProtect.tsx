import React from "react";
import { getUserFromToken } from "../utils/auth";
import { Navigate } from "react-router-dom";

type ProtectedAdminRouteProp = {
  children: React.ReactNode;
};

const AdminProtect: React.FC<ProtectedAdminRouteProp> = ({ children }) => {
  const user = getUserFromToken();

  return user?.isAdmin ? <>{children}</> : <Navigate to="/" />;
};

export default AdminProtect;

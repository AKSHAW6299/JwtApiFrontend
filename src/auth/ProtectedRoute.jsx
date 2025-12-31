import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { WebData } from "../contextApi/AuthContext";

const ProtectedRoute = () => {
  const { user } = useContext(WebData);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

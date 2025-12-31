import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { WebData } from "../contextApi/AuthContext";

const RoleRoute = ({ allowedRoles, children }) => {
  const { role } = useContext(WebData);

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;

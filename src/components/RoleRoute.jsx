// RoleRoute.jsx
import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Not logged in
  if (!user || !token) {
    return <Navigate to="/signin" replace />;
  }

  // Logged in but wrong role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default RoleRoute;

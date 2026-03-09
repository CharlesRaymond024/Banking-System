import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";

const RequireAuth = ({ role }) => {
  const { auth } = useContext(AuthContext);

  console.log("RequireAuth auth:", auth);

  // If user not logged in
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  // If role does not match
  if (auth.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;

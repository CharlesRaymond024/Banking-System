// RequireAuth.jsx — use your hook instead of raw useContext
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // ← cleaner, consistent with rest of app

const RequireAuth = ({ role }) => {
  const { auth } = useAuth(); // ← instead of useContext(AuthContext) directly

  if (!auth?.accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (auth.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
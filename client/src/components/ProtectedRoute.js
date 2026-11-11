import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap a page in <ProtectedRoute> to guard it:
//   - not signed in            -> sent to /signin (and brought back afterwards)
//   - signed in but not admin  -> sent to /unauthorized (only when adminOnly)
// NOTE: this only protects the SCREEN. The real security is on the server,
// which checks the token on every API request.
function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="page-shell status-text">Checking your session…</p>;

  if (!user) return <Navigate to="/signin" replace state={{ from: location.pathname }} />;

  if (adminOnly && user.role !== "admin") return <Navigate to="/unauthorized" replace />;

  return children;
}

export default ProtectedRoute;

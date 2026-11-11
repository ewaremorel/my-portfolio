import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Alert from "../components/Alert";

// A page for ANY signed-in user (wrapped in <ProtectedRoute> in App.js)
function Account() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSignOut() {
    await signOut();
    navigate("/signin");
  }

  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Your account</p>
        <h1 className="page-title">Hello, {user.name.split(" ")[0]}<span>.</span></h1>
      </header>

      {location.state?.welcome && (
        <Alert type="success">Your account was created and you are now signed in.</Alert>
      )}

      <dl className="account-details">
        <dt>Name</dt><dd>{user.name}</dd>
        <dt>Email</dt><dd>{user.email}</dd>
        <dt>Role</dt><dd>{user.role}</dd>
      </dl>

      <Alert type="info">
        {isAdmin
          ? "As an administrator you can add, edit and delete projects, qualifications and contact messages."
          : "As a regular user you can view projects and qualifications. Only administrators can change them."}
      </Alert>

      <div className="form-actions">
        <button type="button" className="btn-primary" onClick={handleSignOut}>Sign out</button>
      </div>
    </main>
  );
}

export default Account;

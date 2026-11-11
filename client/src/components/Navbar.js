import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link className="brand" to="/" aria-label="EwareDev home">
        <span className="brand-mark" aria-hidden="true">e.</span>
        <span>EwareDev</span>
      </Link>

      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/projects">Projects</NavLink></li>
        <li><NavLink to="/education">Education</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>

        {isAdmin && <li><NavLink to="/admin/contacts">Messages</NavLink></li>}

        {user ? (
          <>
            <li><NavLink to="/account">{user.name.split(" ")[0]} ({user.role})</NavLink></li>
            <li>
              <button type="button" className="nav-button" onClick={handleSignOut}>
                Sign out
              </button>
            </li>
          </>
        ) : (
          <>
            <li><NavLink to="/signin">Sign in</NavLink></li>
            <li><NavLink to="/signup">Sign up</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

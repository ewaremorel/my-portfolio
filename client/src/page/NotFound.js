import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">404 · Not found</p>
        <h1 className="page-title">Page not found<span>.</span></h1>
        <p className="page-lead">The page you are looking for does not exist.</p>
      </header>
      <div className="button-row">
        <Link className="button-link" to="/">Back to home</Link>
      </div>
    </main>
  );
}

export default NotFound;

import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">403 · Forbidden</p>
        <h1 className="page-title">Access denied<span>.</span></h1>
        <p className="page-lead">This page is only available to administrators.</p>
      </header>
      <div className="button-row">
        <Link className="button-link" to="/">Back to home</Link>
      </div>
    </main>
  );
}

export default Unauthorized;

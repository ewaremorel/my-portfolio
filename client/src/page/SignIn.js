import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormField from "../components/FormField";
import Alert from "../components/Alert";
import { validateSignIn } from "../utils/validate";

function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // if the user was sent here by a protected page, return to it after signing in
  const redirectTo = location.state?.from || "/";

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const found = validateSignIn(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      await signIn({ email: values.email.trim(), password: values.password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Welcome back</p>
        <h1 className="page-title">Sign in<span>.</span></h1>
        <p className="page-lead">Administrators can manage content. Regular users can view it.</p>
      </header>

      <section className="auth-layout">
        <form className="contact-form auth-form" onSubmit={handleSubmit} noValidate>
          <FormField id="email" label="Email" type="email" autoComplete="email" fullWidth
            value={values.email} onChange={handleChange} error={errors.email} />
          <FormField id="password" label="Password" type="password" autoComplete="current-password" fullWidth
            value={values.password} onChange={handleChange} error={errors.password} />

          <div className="full-width">
            <Alert type="error">{serverError}</Alert>
          </div>

          <div className="form-actions full-width">
            <button type="submit" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </div>
          <p className="full-width hint-text">
            No account yet? <Link to="/signup">Create one</Link>.
          </p>
        </form>
      </section>
    </main>
  );
}

export default SignIn;

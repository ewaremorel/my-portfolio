import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormField from "../components/FormField";
import Alert from "../components/Alert";
import { validateSignUp } from "../utils/validate";

function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" });
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

    const found = validateSignUp(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      await signUp({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      navigate("/account", { replace: true, state: { welcome: true } });
    } catch (err) {
      const details = err.errors?.length ? ` ${err.errors.join(". ")}.` : "";
      setServerError(err.message + details);
      setSubmitting(false);
    }
  }

  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Join in</p>
        <h1 className="page-title">Sign up<span>.</span></h1>
        <p className="page-lead">Create a free account to view portfolio content as a signed-in user.</p>
      </header>

      <section className="auth-layout">
        <form className="contact-form auth-form" onSubmit={handleSubmit} noValidate>
          <FormField id="name" label="Full name" autoComplete="name" fullWidth
            value={values.name} onChange={handleChange} error={errors.name} />
          <FormField id="email" label="Email" type="email" autoComplete="email" fullWidth
            value={values.email} onChange={handleChange} error={errors.email} />
          <FormField id="password" label="Password (min. 8 characters)" type="password"
            autoComplete="new-password" fullWidth
            value={values.password} onChange={handleChange} error={errors.password} />
          <FormField id="confirm" label="Confirm password" type="password"
            autoComplete="new-password" fullWidth
            value={values.confirm} onChange={handleChange} error={errors.confirm} />

          <div className="full-width">
            <Alert type="error">{serverError}</Alert>
          </div>

          <div className="form-actions full-width">
            <button type="submit" disabled={submitting}>
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </div>
          <p className="full-width hint-text">
            Already registered? <Link to="/signin">Sign in</Link>.
          </p>
        </form>
      </section>
    </main>
  );
}

export default SignUp;

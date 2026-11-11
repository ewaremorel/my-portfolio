import { useState } from "react";
import FormField from "./FormField";
import Alert from "./Alert";
import { validateContact } from "../utils/validate";

const EMPTY = { firstName: "", lastName: "", phone: "", email: "", message: "" };

// Used in two places:
//   1) the public Contact page (visitor sends a message)
//   2) the admin Messages page (admin edits a saved message)
function ContactForm({ initial, submitLabel = "Send message", onSubmit, onCancel, resetOnSuccess = false }) {
  const [values, setValues] = useState({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    setSuccess("");

    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      const message = await onSubmit(values);
      if (resetOnSuccess) setValues(EMPTY);
      if (message) setSuccess(message);
    } catch (err) {
      const details = err.errors?.length ? ` ${err.errors.join(". ")}.` : "";
      setServerError(err.message + details);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <FormField id="firstName" label="First name" autoComplete="given-name"
        value={values.firstName} onChange={handleChange} error={errors.firstName} />
      <FormField id="lastName" label="Last name" autoComplete="family-name"
        value={values.lastName} onChange={handleChange} error={errors.lastName} />
      <FormField id="phone" label="Phone number (optional)" type="tel" autoComplete="tel"
        value={values.phone || ""} onChange={handleChange} error={errors.phone} />
      <FormField id="email" label="Email" type="email" autoComplete="email"
        value={values.email} onChange={handleChange} error={errors.email} />
      <FormField id="message" label="Message" multiline fullWidth
        value={values.message} onChange={handleChange} error={errors.message} />

      <div className="full-width">
        <Alert type="error">{serverError}</Alert>
        <Alert type="success">{success}</Alert>
      </div>

      <div className="form-actions full-width">
        <button type="submit" disabled={submitting}>
          {submitting ? "Sending…" : submitLabel} {!submitting && <span aria-hidden="true">↗</span>}
        </button>
        {onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;

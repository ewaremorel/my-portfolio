import { useState } from "react";
import FormField from "./FormField";
import Alert from "./Alert";
import { validateResource } from "../utils/validate";
import { toDateInput } from "../utils/format";

// The form for BOTH "project" and "qualification" (they have the same fields).
//   noun         -> "project" or "qualification" (only used in labels)
//   initial      -> an existing record when editing, or undefined when adding
//   onSubmit     -> async function that saves the values (throws on failure)
//   onCancel     -> closes the form
function ResourceForm({ noun, initial, onSubmit, onCancel }) {
  const editing = Boolean(initial);

  // STATE: what the user has typed so far
  const [values, setValues] = useState({
    title: initial?.title || "",
    completion: toDateInput(initial?.completion),
    description: initial?.description || "",
  });
  const [errors, setErrors] = useState({}); // validation problems, per field
  const [serverError, setServerError] = useState(""); // problems reported by the API
  const [submitting, setSubmitting] = useState(false); // true while saving

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const found = validateResource(values); // 1) check in the browser first
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true); // 2) send to the API
    try {
      await onSubmit(values);
    } catch (err) {
      const details = err.errors?.length ? ` ${err.errors.join(". ")}.` : "";
      setServerError(err.message + details);
      setSubmitting(false);
    }
  }

  return (
    <form className="contact-form resource-form" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title full-width">
        {editing ? `Edit ${noun}` : `Add a new ${noun}`}
      </h2>

      <FormField id="title" label="Title" value={values.title}
        onChange={handleChange} error={errors.title} fullWidth />
      <FormField id="completion" label="Completion date" type="date" value={values.completion}
        onChange={handleChange} error={errors.completion} fullWidth />
      <FormField id="description" label="Description" multiline value={values.description}
        onChange={handleChange} error={errors.description} fullWidth />

      <div className="full-width">
        <Alert type="error">{serverError}</Alert>
      </div>

      <div className="form-actions full-width">
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : editing ? "Save changes" : `Add ${noun}`}
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ResourceForm;

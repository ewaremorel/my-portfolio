// One label + input (or textarea) + error message.
// Keeping this in one place means every form looks and behaves the same.
function FormField({ id, label, error, fullWidth = false, multiline = false, ...inputProps }) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <div className={`form-field${fullWidth ? " full-width" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <Tag
        id={id}
        name={id}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className={error ? "input-error" : undefined}
        {...inputProps}
      />
      {error && (
        <span className="field-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

export default FormField;

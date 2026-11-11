// A small coloured message box: type = "success" | "error" | "info"
function Alert({ type = "info", children }) {
  if (!children) return null;
  // errors are announced to screen readers immediately, others politely
  const role = type === "error" ? "alert" : "status";
  return (
    <div className={`alert alert-${type}`} role={role}>
      {children}
    </div>
  );
}

export default Alert;

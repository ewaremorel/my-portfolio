// Each function returns an object of error messages: { fieldName: "message" }.
// An EMPTY object means "everything is valid".

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export function validateSignUp({ name, email, password, confirm }) {
  const errors = {};
  if (!name.trim()) errors.name = "Name is required";
  if (!email.trim()) errors.email = "Email is required";
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = "Enter a valid email address";
  if (!password) errors.password = "Password is required";
  else if (password.length < 8) errors.password = "Password must be at least 8 characters";
  if (confirm !== password) errors.confirm = "Passwords do not match";
  return errors;
}

export function validateSignIn({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = "Email is required";
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = "Enter a valid email address";
  if (!password) errors.password = "Password is required";
  return errors;
}

// Used for BOTH projects and qualifications (same three fields)
export function validateResource({ title, completion, description }) {
  const errors = {};
  if (!title.trim()) errors.title = "Title is required";
  if (!completion) errors.completion = "Completion date is required";
  if (!description.trim()) errors.description = "Description is required";
  return errors;
}

export function validateContact({ firstName, lastName, phone, email, message }) {
  const errors = {};
  if (!firstName.trim()) errors.firstName = "First name is required";
  if (!lastName.trim()) errors.lastName = "Last name is required";
  if (phone.trim() && !/^[0-9+()\-.\s]{7,20}$/.test(phone.trim())) {
    errors.phone = "Enter a valid phone number";
  }
  if (!email.trim()) errors.email = "Email is required";
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = "Enter a valid email address";
  if (!message.trim()) errors.message = "Message is required";
  return errors;
}

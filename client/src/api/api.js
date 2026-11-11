// ------------------------------------------------------------------
// The ONLY file that talks to the backend.
// Every page uses these helpers, so error handling and the
// "Authorization: Bearer <token>" header live in one single place.
// ------------------------------------------------------------------

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// ---- token storage ------------------------------------------------
// The JWT is kept in localStorage so the user stays signed in after a page
// refresh. Trade-off: JavaScript on the page can read localStorage, so we
// never render user-supplied HTML (React escapes text by default) and the
// token expires after 1 hour. See README for the full explanation.
const TOKEN_KEY = "portfolio_token";

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

// ---- a friendlier error type --------------------------------------
export class ApiError extends Error {
  constructor(message, status = 0, errors = []) {
    super(message);
    this.name = "ApiError";
    this.status = status; // HTTP status code (0 = server unreachable)
    this.errors = errors; // list of validation messages from the server
  }
}

// If the server says "401 invalid/expired token", AuthContext registers a
// function here that signs the user out automatically.
let onUnauthorized = null;
export const setUnauthorizedHandler = (fn) => {
  onUnauthorized = fn;
};

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = tokenStore.get();
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new ApiError("Cannot reach the server. Is the backend running?", 0);
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 401 && auth && token && onUnauthorized) onUnauthorized();
    throw new ApiError(
      (data && data.message) || `Request failed (${res.status})`,
      res.status,
      (data && data.errors) || []
    );
  }
  return data;
}

// ---- authentication -----------------------------------------------
export const authApi = {
  signUp: (values) => request("/auth/signup", { method: "POST", body: values, auth: false }),
  signIn: (values) => request("/auth/signin", { method: "POST", body: values, auth: false }),
  signOut: () => request("/auth/signout", { method: "POST" }),
  me: () => request("/auth/me"),
};

// ---- one set of CRUD helpers for every resource --------------------
const resource = (name) => ({
  list: () => request(`/${name}`),
  create: (values) => request(`/${name}`, { method: "POST", body: values }),
  update: (id, values) => request(`/${name}/${id}`, { method: "PUT", body: values }),
  remove: (id) => request(`/${name}/${id}`, { method: "DELETE" }),
});

export const projectsApi = resource("projects");
export const qualificationsApi = resource("qualifications");
export const contactsApi = resource("contacts");

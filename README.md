# EwareDev Portfolio - Full-Stack Application

React frontend + Express/MongoDB backend with JWT authentication,
protected routes and role-based authorization (admin / user).

## Project structure

```
My Portfolio/
├── server.js              Express app entry point
├── config/                db.js (MongoDB connection), seedAdmin.js (creates the admin)
├── controllers/           request handling (auth, users, projects, qualifications, contacts)
├── middleware/            auth.js (JWT + admin check), validateId.js, errorHandler.js
├── models/                Mongoose schemas
├── routes/                URL -> controller wiring, with protection rules
├── scripts/hash-password.js   helper that creates the admin password hash
├── .env.example           template for the secret settings (real .env is NOT committed)
└── client/                React app (Create React App)
    └── src/
        ├── api/api.js         the only file that calls the backend
        ├── context/AuthContext.js   who is signed in (state shared by all pages)
        ├── components/        Navbar, ProtectedRoute, forms, alerts
        ├── page/              one file per page/screen
        └── utils/             validation + date formatting helpers
```

## Setup

1. **Install dependencies**
   ```bash
   npm install
   npm install --prefix client
   ```
2. **Create the backend settings file.** Copy `.env.example` to `.env`, then fill it in.
   Make a password hash for the administrator and paste the printed line into `.env`:
   ```bash
   npm run hash-password -- "YourStrongPassword123"
   ```
3. **Create the frontend settings file.** Copy `client/.env.example` to `client/.env`.
4. **Start MongoDB** (local service or MongoDB Compass connection on `mongodb://127.0.0.1:27017`).
5. **Run both apps** (two terminals):
   ```bash
   npm run server          # API  -> http://localhost:5000
   npm run client          # React -> http://localhost:5173
   ```
   (or `npm run dev` to start both together)

When the API starts it creates the administrator account from `ADMIN_EMAIL`,
`ADMIN_NAME` and `ADMIN_PASSWORD_HASH` (only if it does not exist yet).

## Secrets

* `.env` files are listed in `.gitignore` and are never committed.
* The administrator password is **never** in the code. `.env` holds only a bcrypt
  **hash** of it; the server compares the typed password against that hash.
* `JWT_SECRET` is read from `.env` and never sent to the browser.

## How authentication works (JWT)

1. **Sign up** (`POST /api/auth/signup`) always creates a regular `user`.
   The `admin` role can only come from the seeded account.
2. **Sign in** (`POST /api/auth/signin`) checks the password with bcrypt and returns a
   **JWT access token** (valid 1 hour) containing the user id and role.
3. The React app sends the token with every request:
   `Authorization: Bearer <token>`.
4. `middleware/auth.js` verifies the token (`requireAuth`) and checks the role
   (`requireAdmin`). Missing/invalid token -> **401**. Valid token but not an admin -> **403**.

### Where the token is stored (frontend)

The token is stored in **`localStorage`** (key `portfolio_token`), handled only in
`client/src/api/api.js`.

* Why: it keeps the user signed in after a page refresh and is simple to understand.
* Trade-off: JavaScript running on the page can read `localStorage`, so a cross-site
  scripting (XSS) bug could steal the token. Mitigations used here: React escapes all
  text, no raw HTML is ever rendered, and tokens expire after 1 hour.
* Alternative (more secure, more complex): an `HttpOnly` cookie set by the server.

### How sign-out works with JWT

JWTs are **stateless**: the server does not keep a list of active sessions, so there is
nothing on the server to "destroy". Signing out therefore means:

1. The client calls `POST /api/auth/signout` (the server confirms; the route is protected).
2. The client **deletes the token** from `localStorage` and clears the user from state.
3. Without the token the user can no longer call protected endpoints.

An old token that someone copied would stay valid until it expires (1 hour). That is why
the lifetime is short. (A production app could add a refresh-token or token-blacklist system.)

## Authorization rules

| Resource | Read (GET) | Create / Update / Delete |
|---|---|---|
| Projects | Anyone | Admin only |
| Qualifications | Anyone | Admin only |
| Contacts | Admin only (private data) | **Create:** anyone (public contact form). **Update/Delete:** admin only |
| Users | Admin (list); a user may read/update/delete only their own record | Admin can manage anyone |

The React app also hides admin buttons from regular users and redirects them away from
admin pages, but the **server enforces the rules**, so calling the API directly (Postman)
is blocked too.

## API summary

| Method | URL | Who |
|---|---|---|
| POST | `/api/auth/signup` | public |
| POST | `/api/auth/signin` | public |
| POST | `/api/auth/signout` | signed-in |
| GET | `/api/auth/me` | signed-in |
| GET | `/api/projects`, `/api/qualifications` | public |
| POST / PUT / DELETE | `/api/projects[/:id]`, `/api/qualifications[/:id]` | admin |
| POST | `/api/contacts` | public |
| GET / PUT / DELETE | `/api/contacts[/:id]` | admin |
| GET | `/api/users` | admin |

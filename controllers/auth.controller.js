const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
 
const makeToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
 
// POST /api/auth/signup
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};
    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    // Public sign-up ALWAYS creates a regular user.
    // The administrator is created by the seed script (config/seedAdmin.js), never here.
    const user = await User.create({ name, email, passwordHash, role: "user" });
    res.status(201).json({ message: "Account created", token: makeToken(user), user });
  } catch (err) {
    next(err);
  }
};
 
// POST /api/auth/signin
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    // passwordHash is hidden by default, so we ask for it explicitly here
    const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash");
    const ok = user && (await bcrypt.compare(password, user.passwordHash));
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });
 
    res.status(200).json({ message: "Signed in", token: makeToken(user), user });
  } catch (err) {
    next(err);
  }
};
 
// POST /api/auth/signout
// JWTs are stateless: the server keeps no session. Signing out means the
// client deletes its stored token. Tokens also expire after 1 hour.
exports.signout = (req, res) => {
  res.status(200).json({ message: "Signed out. Delete the token on the client." });
};
 
// GET /api/auth/me  (a simple protected route for the demo)
exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

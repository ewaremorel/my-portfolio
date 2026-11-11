const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const canAccess = (req) => req.user.role === "admin" || req.user.id === req.params.id;

exports.getAll = async (req, res, next) => {
  try {
    res.status(200).json(await User.find().sort({ created: -1 }));
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    if (!canAccess(req)) return res.status(403).json({ message: "Not allowed" });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body || {};
    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: role === "admin" ? "admin" : "user",
    });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (!canAccess(req)) return res.status(403).json({ message: "Not allowed" });

    const body = req.body || {};
    const updates = {};
    if (body.name) updates.name = body.name;
    if (body.email) updates.email = body.email;
    if (body.password) {
      if (body.password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
      }
      updates.passwordHash = await bcrypt.hash(body.password, 10);
    }
    // only an admin may change roles
    if (body.role && req.user.role === "admin") updates.role = body.role;

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    if (!canAccess(req)) return res.status(403).json({ message: "Not allowed" });
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted", id: req.params.id });
  } catch (err) {
    next(err);
  }
};

// admin only; keeps admin accounts so you can't lock yourself out
exports.removeAll = async (req, res, next) => {
  try {
    const result = await User.deleteMany({ role: { $ne: "admin" } });
    res
      .status(200)
      .json({ message: "All non-admin users deleted", deletedCount: result.deletedCount });
  } catch (err) {
    next(err);
  }
};
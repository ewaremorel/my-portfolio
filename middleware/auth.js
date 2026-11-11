const jwt = require("jsonwebtoken");
 
exports.requireAuth = (req, res, next) => {
  const [scheme, token] = (req.headers.authorization || "").split(" ");
 
  if (scheme !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Authentication required. Send header: Authorization: Bearer <token>" });
  }
 
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { id, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
 
exports.requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Administrator access required." });
  }
  next();
};

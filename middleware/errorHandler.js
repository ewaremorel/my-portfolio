module.exports = (err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Request body is not valid JSON." });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid value for field: ${err.path}` });
  }
  if (err.code === 11000) {
    return res
      .status(409)
      .json({ message: "Duplicate value", fields: Object.keys(err.keyValue) });
  }
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};

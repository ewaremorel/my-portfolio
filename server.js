require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const seedAdmin = require("./config/seedAdmin");
const errorHandler = require("./middleware/errorHandler");

// Fail fast if the secret is missing, otherwise tokens could not be signed safely.
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing. Create a .env file (see .env.example).");
  process.exit(1);
}

const app = express();

// Only the React app is allowed to call this API from a browser.
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/contacts", require("./routes/contact.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/qualifications", require("./routes/qualification.routes"));
app.use("/api/users", require("./routes/user.routes"));

// unknown URL -> clean JSON 404
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// must be LAST: turns thrown errors into friendly JSON responses
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(seedAdmin)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  });

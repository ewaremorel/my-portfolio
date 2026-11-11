const User = require("../models/user.model");

// Creates the administrator account from environment variables.
// - Runs every time the server starts, but only creates the admin ONCE.
// - The password is never written in code: .env holds a bcrypt HASH of it.
const seedAdmin = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD_HASH } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH) {
    console.warn("Admin seed skipped: ADMIN_EMAIL or ADMIN_PASSWORD_HASH is missing in .env");
    return;
  }

  const email = ADMIN_EMAIL.toLowerCase();
  const existing = await User.findOne({ email });

  if (existing) {
    // make sure the seeded email really is an administrator
    if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
      console.log(`Existing user ${email} promoted to admin`);
    }
    return;
  }

  await User.create({
    name: ADMIN_NAME || "Administrator",
    email,
    passwordHash: ADMIN_PASSWORD_HASH,
    role: "admin",
  });
  console.log(`Seeded administrator account: ${email}`);
};

module.exports = seedAdmin;

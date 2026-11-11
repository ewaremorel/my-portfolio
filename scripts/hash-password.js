// Usage:  npm run hash-password -- "YourStrongPassword123"
// Prints a bcrypt hash that you paste into .env as ADMIN_PASSWORD_HASH.
const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password || password.length < 8) {
  console.error('Usage: npm run hash-password -- "AtLeast8Characters"');
  process.exit(1);
}

bcrypt.hash(password, 10).then((hash) => {
  console.log("\nPut this line in your .env file (keep the single quotes):\n");
  console.log(`ADMIN_PASSWORD_HASH='${hash}'\n`);
});

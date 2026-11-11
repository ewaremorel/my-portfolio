const mongoose = require("mongoose");
 
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    // select:false means queries never return this field unless asked explicitly
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  // gives the "created date" and "updated date" the assignment asks for
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);
 
// second safety net: never include the hash when converting to JSON
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  },
});
 
module.exports = mongoose.model("User", userSchema);

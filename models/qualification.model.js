const mongoose = require("mongoose");
 
const qualificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    completion: { type: Date, required: [true, "Completion date is required"] },
    description: { type: String, required: [true, "Description is required"], trim: true },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("Qualification", qualificationSchema);

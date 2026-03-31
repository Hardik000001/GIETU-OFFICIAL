const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: String,
  name: String,
  shortDesc: String,
  fullDesc: String,
  year: String,
  coverImage: String,
  images: [String],
  type: String, // "student" or "faculty"
});

module.exports = mongoose.model("Achievement", achievementSchema);
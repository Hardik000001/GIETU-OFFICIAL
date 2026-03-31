const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: String,
  designation: String,
  email: String,
  image: String,
  bio: String,
}, { timestamps: true });

module.exports = mongoose.model("Faculty", facultySchema);
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  branch: String,
  roll: String,
  activityId: String,
  activityTitle: String
}, { timestamps: true });

module.exports = mongoose.model("Registration", registrationSchema);
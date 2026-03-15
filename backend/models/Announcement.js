const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
});

module.exports =
  mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema);

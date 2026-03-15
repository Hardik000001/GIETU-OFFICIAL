const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Notice ||
  mongoose.model("Notice", noticeSchema);

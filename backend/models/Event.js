const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Event ||
  mongoose.model("Event", eventSchema);

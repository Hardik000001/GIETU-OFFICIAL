const Activity = require("../models/Activity");

exports.getActivities = async (req, res) => {
  const data = await Activity.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.addActivity = async (req, res) => {
  const activity = await Activity.create(req.body);
  res.json(activity);
};

exports.updateActivity = async (req, res) => {
  const updated = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteActivity = async (req, res) => {
  await Activity.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};
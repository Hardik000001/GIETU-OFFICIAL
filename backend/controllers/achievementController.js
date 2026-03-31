const Achievement = require("../models/Achievement");

exports.getAchievements = async (req, res) => {
  try {
    const data = await Achievement.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAchievement = async (req, res) => {
  try {
    const newData = new Achievement(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const updated = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
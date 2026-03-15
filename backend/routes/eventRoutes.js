const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const protect = require("../middleware/auth"); // ✅ ADDED
const upload = require("../middleware/upload");


// GET all events (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD event (ADMIN ONLY)
router.post("/", protect, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE event (ADMIN ONLY)
router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE event (ADMIN ONLY)
router.delete("/:id", protect, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id); // ✅ FIXED
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// cloudinary
router.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    success: true,
    imageUrl: req.file.path,
  });
});

res.status(200).json({
    success: true,
    imageUrl: req.file.path,
    publicId: req.file.filename,
  });

module.exports = router;

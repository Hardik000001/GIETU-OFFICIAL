const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");

// GET all
router.get("/", async (req, res) => {
  const data = await Faculty.find();
  res.json(data);
});

// ADD
router.post("/", async (req, res) => {
  const faculty = new Faculty(req.body);
  await faculty.save();
  res.json(faculty);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

/* ============================= */
/* CREATE ADMIN (ONE TIME) */
/* ============================= */
router.post("/create", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin created successfully",
      adminId: admin._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================= */
/* ADMIN LOGIN (JWT) */
/* ============================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ FIXED: SAME SECRET AS .env
    const token = jwt.sign(
      {
        id: admin._id,
        adminId: admin._id,
      },
      process.env.JWT_SECRET,   // 🔥 IMPORTANT FIX
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
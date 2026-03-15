const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ============================
// REGISTER ADMIN (one-time)
// ============================
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("REGISTER BODY:", req.body);

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Admin.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Admin created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ============================
// LOGIN ADMIN
// ============================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("LOGIN EMAIL:", email);
        console.log("LOGIN PASSWORD:", password);

        if (!email || !password) {
            return res.status(400).json({ message: "Email & password required" });
        }

        const admin = await Admin.findOne({ email });
        console.log("ADMIN FOUND:", admin);

        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        console.log("PASSWORD MATCH:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

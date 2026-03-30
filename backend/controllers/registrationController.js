const Registration = require("../models/Registration");
const nodemailer = require("nodemailer");

// helper
const isValidEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};

exports.register = async (req, res) => {
    try {
        const { name, email, branch, roll, activityId, activityTitle } = req.body;

        console.log("REQUEST BODY:", req.body);

        if (!name || !email || !branch || !roll || !activityId || !activityTitle) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ msg: "Invalid Email" });
        }

        const existing = await Registration.findOne({ email, activityId });
        if (existing) {
            return res.status(400).json({ msg: "Already Registered" });
        }

        const user = await Registration.create({
            name,
            email,
            branch,
            roll,
            activityId,
            activityTitle
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Registration Successful 🎉",
                text: `Hello ${name}, you have successfully registered for ${activityTitle}`
            });
        } catch (mailErr) {
            console.error("MAIL ERROR:", mailErr);
        }

        res.json({ msg: "Registered Successfully", user });

    } catch (err) {
        console.error("REGISTER ERROR:", err);
        res.status(500).json({ msg: "Server Error" });
    }
};

// ✅ ADD THIS (missing earlier)
exports.getAll = async (req, res) => {
    try {
        const users = await Registration.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};
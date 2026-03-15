const Notice = require("../models/Notice");

// CREATE
exports.createNotice = async (req, res) => {
    const notice = await Notice.create(req.body);
    res.status(201).json(notice);
};

// READ
exports.getNotices = async (req, res) => {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
};

// UPDATE
exports.updateNotice = async (req, res) => {
    const updated = await Notice.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
};

// DELETE
exports.deleteNotice = async (req, res) => {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice deleted" });
};

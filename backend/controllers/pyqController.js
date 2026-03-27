const Pyq = require("../models/Pyq");

// GET
exports.getPyqs = async (req, res) => {
    const { subject, year } = req.query;

    let filter = {};
    if (subject) filter.subject = subject;
    if (year) filter.year = year;

    const data = await Pyq.find(filter).sort({ createdAt: -1 });
    res.json(data);
};

// ADD
exports.addPyq = async (req, res) => {
    try {
        const pyq = new Pyq({
            title: req.body.title,
            subject: req.body.subject,
            year: req.body.year,
            fileUrl: req.file.path,
            publicId: req.file.filename,
        });

        await pyq.save();
        res.json(pyq);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
exports.deletePyq = async (req, res) => {
    await Pyq.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};

// 🔥 UPDATE (NEW)
exports.updatePyq = async (req, res) => {
    try {
        const updateData = {
            title: req.body.title,
            subject: req.body.subject,
            year: req.body.year,
        };

        if (req.file) {
            updateData.fileUrl = req.file.path;
            updateData.publicId = req.file.filename;
        }

        const updated = await Pyq.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
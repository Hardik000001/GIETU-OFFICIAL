const mongoose = require("mongoose");

const pyqSchema = new mongoose.Schema(
    {
        title: String,
        subject: String,
        year: String,
        fileUrl: String,
        publicId: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Pyq", pyqSchema);
// const Announcement = require("../models/Announcement");

// // CREATE announcement (Admin)
// exports.createAnnouncement = async (req, res) => {
//     try {
//         const announcement = await Announcement.create(req.body);
//         res.status(201).json(announcement);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // GET all announcements (Students)
// exports.getAnnouncements = async (req, res) => {
//     try {
//         const announcements = await Announcement.find().sort({ createdAt: -1 });
//         res.status(200).json(announcements);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// // UPDATE announcement (Admin)
// exports.updateAnnouncement = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updated = await Announcement.findByIdAndUpdate(
//             id,
//             req.body,
//             { new: true }
//         );

//         if (!updated) {
//             return res.status(404).json({ message: "Announcement not found" });
//         }

//         res.status(200).json(updated);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // DELETE announcement (Admin)
// exports.deleteAnnouncement = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deleted = await Announcement.findByIdAndDelete(id);
//         if (!deleted) {
//             return res.status(404).json({ message: "Announcement not found" });
//         }

//         res.status(200).json({ message: "Announcement deleted" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
const Announcement = require("../models/Announcement");

// CREATE announcement (Admin)
exports.createAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.create(req.body);
        res.status(201).json(announcement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET all announcements (Public)
exports.getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE announcement (Admin)
exports.updateAnnouncement = async (req, res) => {
    try {
        const updated = await Announcement.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE announcement (Admin)
exports.deleteAnnouncement = async (req, res) => {
    try {
        const deleted = await Announcement.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        res.status(200).json({ message: "Announcement deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

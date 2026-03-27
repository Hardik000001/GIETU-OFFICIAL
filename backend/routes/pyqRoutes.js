const express = require("express");
const router = express.Router(); // ✅ IMPORTANT

const protect = require("../middleware/auth");
const upload = require("../middleware/upload");

const {
    getPyqs,
    addPyq,
    deletePyq,
    updatePyq,
} = require("../controllers/pyqController");

// GET all / filter
router.get("/", getPyqs);

// ADD
router.post("/", protect, upload.single("file"), addPyq);

// DELETE
router.delete("/:id", protect, deletePyq);

// UPDATE
router.put("/:id", protect, upload.single("file"), updatePyq);

module.exports = router;
const express = require("express");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({
      success: true,
      imageUrl: req.file.path,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

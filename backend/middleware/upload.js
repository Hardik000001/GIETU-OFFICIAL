const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    // 🔥 CHECK FILE TYPE
    let resourceType = "auto"; // auto = image + pdf dono handle karega

    return {
      folder: "GIET_DeptConnect",
      resource_type: resourceType,
      allowed_formats: ["jpg", "jpeg", "png", "pdf"], // ✅ PDF ADD
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
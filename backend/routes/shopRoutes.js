const express = require("express");
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");
const { registerShop, getShops } = require("../controllers/shopController");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads/logos");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/logos"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/register", protect, upload.single("logo"), registerShop);
router.get("/", getShops);

module.exports = router;
